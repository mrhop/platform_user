/**
 * Created by Donghui Huo on 2016/5/13.
 */
export default class WorkGroup {
    constructor(parent) {
        this.parent = parent
        this.data = {};
        this.svgContainer = this.parent.d3.svgContainer;
        this.workGroup = this.svgContainer.append("g")
            .attr("class", "work-group")
            .attr("transform", "translate(0,0)")
        this.baseReact = this.workGroup.append("rect")
            .attr("class", "work-base-react")
        this.totalElemntGroup = this.workGroup.append("g")
            .attr("class", "elements-group")
            .attr("transform", "translate(0,0)")
    }

    resize(containerWidth, containerHeight, data) {
        this.baseReact
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", (containerWidth - 110))
            .attr("height", containerHeight - 10);
        this.data.containerWidth = containerWidth - 110
        this.data.containerHeight = containerHeight - 10
        if (data) {
            this.data.items = data
            this.drawData()
        } else {
            this.data.items = data
            this.cleanWorkgroup();
        }
    }

    cleanWorkgroup() {
        this.totalElemntGroup.selectAll("*").remove();
        this.parent.workDataCoordinate = null
    }

    drawData() {
        this.cleanWorkgroup();
        var hor = this.data.containerWidth > this.data.containerHeight ? true : false;
        var y = 0, x = 0;
        var size = 80
        if (hor) {
            x = 5
            var widthSegment = parseInt((this.data.containerWidth - 5) / (2 * this.data.items.length - 1))
            size = 80 > widthSegment ? widthSegment : 80;
        } else {
            y = 5
            var heightSegment = parseInt((this.data.containerHeight - 5) / (2 * this.data.items.length - 1))
            size = 40 > heightSegment ? heightSegment : 40;
        }
        var linePoints = {}
        var positionData = [];
        //var relatedElementClick = [];
        for (var i = 0; i < this.data.items.length; i++) {
            var item = this.data.items[i];
            var length = item.length;
            var subSize = 50
            if (hor) {
                x = size * (i > 0 ? 2 : 0) + x;
                var heightSegment = parseInt(this.data.containerHeight / item.length)
                subSize = 50 > heightSegment ? heightSegment : 50;
            } else {
                y = size * (i > 0 ? 2 : 0) + y;
                var widthSegment = parseInt(this.data.containerWidth / item.length)
                subSize = 90 > widthSegment ? widthSegment : 90;
            }
            for (var j = 0; j < item.length; j++) {
                var subItem = item[j];
                if (hor) {
                    y = subSize * j;
                } else {
                    x = subSize * j;
                }
                //获取data
                //获取dataup
                //获取datadown
                var dataUp = {}
                var dataDown = {}
                if (this.data.items[i - 1] && this.data.items[i - 1].length > 0) {
                    var upItems = this.data.items[i - 1]
                    if (this.parent.props.type == "actions") {
                        if (subItem.type == "action") {
                            var positionUps = this.generateOptions(upItems, "position", "up", subItem.id, this.parent)
                            var roleUps = this.generateOptions(upItems, "role", "up", subItem.id, this.parent)
                            if (positionUps.data && positionUps.data.length > 0) {
                                dataUp.positions = positionUps
                            }
                            if (roleUps.data && roleUps.data.length > 0) {
                                dataUp.roles = roleUps
                            }
                        } else {
                            var actionUps = this.generateOptions(upItems, "action", "up", subItem.id, this.parent)
                            dataUp = actionUps;
                        }
                    } else {
                        var positionUps = this.generateOptions(upItems, "position", "up", subItem.id, this.parent)
                        if (positionUps.data && positionUps.data.length > 0) {
                            dataUp.positions = positionUps
                        }
                    }
                }
                if (this.data.items[i + 1] && this.data.items[i + 1].length > 0) {
                    var downItems = this.data.items[i + 1]
                    if (this.parent.props.type == "actions") {
                        if (subItem.type == "action") {
                            var positionDowns = this.generateOptions(downItems, "position", "down", subItem.id, this.parent)
                            var roleDowns = this.generateOptions(downItems, "role", "down", subItem.id, this.parent)
                            if (positionDowns.data && positionDowns.data.length > 0) {
                                dataDown.positions = positionDowns
                            }
                            if (roleDowns.data && roleDowns.data.length > 0) {
                                dataDown.roles = roleDowns
                            }
                        } else {
                            var actionDowns = this.generateOptions(downItems, "action", "down", subItem.id, this.parent)
                            dataDown = actionDowns;
                        }
                    } else {
                        var positionDowns = this.generateOptions(downItems, "position", "down", subItem.id, this.parent)
                        if (positionDowns.data && positionDowns.data.length > 0) {
                            dataDown.positions = positionDowns
                        }
                    }
                }
                var group = this.totalElemntGroup.append("g").data([{dataUp, dataDown, data: subItem}])
                    .attr("id", "item-workgroup-" + subItem.id)
                    .attr("transform", "translate(" + x + "," + y + ")")
                    .on("click", function (d) {
                            if (d3.event.defaultPrevented) {
                                return;
                            }
                            this.parent.showElementFrom({
                                operationType: "update",
                                data: d.data,
                                dataUp: d.dataUp,
                                dataDown: d.dataDown
                            })
                        }.bind(this)
                    );
                //relatedElementClick.push({dataUp, dataDown, group, data: subItem});
                positionData
                    .push({
                            x1: x,
                            y1: y,
                            x2: hor ? x + size : x + subSize,
                            y2: hor ? y + subSize : size + y,
                            data: subItem
                        }
                    )
                var type = "rect";
                if (subItem.type == "role") {
                    type = "ellipse"
                } else if (subItem.type == "position") {
                    type = "rect"
                } else if (subItem.type == "action") {
                    type = "polygon"
                }

                group.append("text").data([subItem])
                    .attr("class", type + "-text innner-text")
                    .attr("x", hor ? parseInt(size / 2) : parseInt((subSize - 10) / 2) + 5)
                    .attr("y", hor ? parseInt((subSize - 10) / 2) + 5 : parseInt(size / 2))
                    .attr('pointer-events', 'all')
                    .text(subItem.label)
                var leftOrTopPoint = {
                    x: hor ? x : x + parseInt(subSize / 2),
                    y: hor ? y + parseInt(subSize / 2) : y
                }
                var rightOrBottomPoint = {
                    x: hor ? x + size : x + parseInt(subSize / 2),
                    y: hor ? y + parseInt(subSize / 2) : y + size
                }
                linePoints["point_" + subItem.id] = {leftOrTopPoint, rightOrBottomPoint}
                if (subItem.type == "role") {
                    group.append("ellipse").data([subItem])
                        .attr("class", "common-element common-element-workspace")
                        .attr("cx", hor ? parseInt(size / 2) : parseInt((subSize - 10) / 2) + 5)
                        .attr("cy", hor ? parseInt((subSize - 10) / 2) + 5 : parseInt(size / 2))
                        .attr("rx", hor ? parseInt(size / 2) : parseInt((subSize - 10) / 2))
                        .attr("ry", hor ? parseInt((subSize - 10) / 2) : parseInt(size / 2))
                        .attr('pointer-events', 'all')

                } else if (subItem.type == "position") {
                    group.append("rect").data([subItem])
                        .attr("class", "common-element common-element-workspace")
                        .attr("x", hor ? 0 : 5)
                        .attr("y", hor ? 5 : 0)
                        .attr("height", hor ? subSize - 10 : size)
                        .attr("width", hor ? size : subSize - 10)
                } else if (subItem.type == "action") {
                    var point = ""
                    if (hor) {
                        point = "0," + parseInt((subSize - 10) / 2 + 5) + " " + parseInt(size / 2) + ",5" + " " + size + "," + parseInt((subSize - 10) / 2 + 5) + " " + parseInt(size / 2) + "," + (subSize - 5)
                    } else {
                        point = "5," + parseInt(size / 2) + " " + parseInt((subSize - 10) / 2 + 5) + ",0" + " " + (subSize - 5) + "," + parseInt(size / 2) + " " + parseInt((subSize - 10) / 2 + 5) + "," + size
                    }
                    group.append("polygon").data([subItem])
                        .attr("class", "common-element common-element-workspace")
                        .attr("points", point)
                }
                if (subItem.parentId) {
                    for (var k = 0; k < subItem.parentId.length; k++) {
                        var originPoint = linePoints["point_" + subItem.parentId[k]]
                        if (originPoint) {
                            this.totalElemntGroup.append("line")
                                .attr("class", "line-work-group")
                                .attr("x1", originPoint.rightOrBottomPoint.x)
                                .attr("y1", originPoint.rightOrBottomPoint.y)
                                .attr("x2", leftOrTopPoint.x)
                                .attr("y2", leftOrTopPoint.y)
                        }
                    }
                }
            }
        }
        this.parent.workDataCoordinate = positionData;
    }


    generateOptions(items, type, direction, id, parent) {
        var data = []
        var defaultValue = []
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.type == type) {
                if (direction == "up" || parent.props.type == "actions") {
                    data.push({"value": item.id, "label": item.label})
                } else if (direction == "down" && parent.props.type == "positions") {
                    if (!item.parentId || item.parentId.length <= 0 || item.parentId.indexOf(id) > -1) {
                        data.push({"value": item.id, "label": item.label})
                    }
                }
                if (direction == "up" && item.childId && item.childId.indexOf(id) > -1) {
                    defaultValue.push(item.id)
                }
                if (direction == "down" && item.parentId && item.parentId.indexOf(id) > -1) {
                    defaultValue.push(item.id)
                }
            }
        }
        return {data, defaultValue}
    }

    //drag and delete

}