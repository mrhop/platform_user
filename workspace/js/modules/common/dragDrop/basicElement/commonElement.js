/**
 * Created by Donghui Huo on 2016/5/13.
 */
import dragDropRules from '../structure'

export default class CommonElement {
    constructor(parent, group, data, dragstart, drag, dragend) {
        this.data = data;
        this.data.parent = parent
        this.type = data.type
        this.model = data.model
        this.label = data.label
        this.group = group


        this.dragstart = dragstart ? dragstart : this.defaultDragStart;
        this.drag = drag ? drag : this.defaultDrag;
        this.dragend = dragend ? dragend : this.defaultDragEnd;

        let select = this.model === 'diamond' ? 'polygon' : this.model;
        this.groupBack = this.group.append("g")
            .attr("class", "sample-group-drag")
        if (this.label) {
            this.textElementBack = this.groupBack.append("text")
                .attr("class", this.model + "-text innner-text")
                .text(this.label)
        }
        this.elementBack = this.groupBack.append(select)
            .attr("class", "common-element common-element-back")
        this.groupDrag = this.group.append("g")
            .attr("class", "sample-group-drag ")
            .call(d3.behavior.drag()
                .on("dragstart", this.dragstart)
                .on("drag", this.drag)
                .on("dragend", this.dragend)
            )
        if (this.label) {
            this.textElementDrag = this.groupDrag.append("text")
                .attr("class", this.model + "-text innner-text")
                .text(this.label)
        }
        this.elementDrag = this.groupDrag.append(select)
            .attr("class", "common-element")
    }

    resize(obj) {
        l_merge(this.data, obj)
        this.groupBack.data([this.data])
            .attr("transform", "translate(" + obj.x + "," + obj.y + ")")
        this.groupDrag.data([this.data])
            .attr("transform", "translate(" + obj.x + "," + obj.y + ")")
        if (this.textElementBack) {
            this.textElementBack
                .data([this.data])
                .attr("x", 40)
                .attr("y", function (d) {
                    return parseInt(d.size / 2)
                })
        }
        this.textElementDrag
            .data([this.data])
            .attr("x", 40)
            .attr("y", function (d) {
                return parseInt(d.size / 2)
            })
        if (this.model == 'circle') {
            if (this.elementBack) {
                this.elementBack
                    .data([this.data])
                    .attr("cx", 40)
                    .attr("cy", function (d) {
                        return parseInt(d.size / 2)
                    })
                    .attr("r", function (d) {
                        return parseInt(d.size / 2)
                    })
            }
            this.elementDrag
                .data([this.data])
                .attr("cx", 40)
                .attr("cy", function (d) {
                    return parseInt(d.size / 2)
                })
                .attr("r", function (d) {
                    return parseInt(d.size / 2)
                })
        } else if (this.model == 'rect') {
            if (this.elementBack) {
                this.elementBack
                    .data([this.data])
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("height", this.data.size)
                    .attr("width", 80)
            }
            this.elementDrag
                .data([this.data])
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", this.data.size)
                .attr("width", 80)
        } else if (this.model == 'ellipse') {
            if (this.elementBack) {
                this.elementBack
                    .data([this.data])
                    .attr("cx", 40)
                    .attr("cy", function (d) {
                        return parseInt(d.size / 2)
                    })
                    .attr("rx", 40)
                    .attr("ry", function (d) {
                        return parseInt(d.size / 2)
                    })
            }
            this.elementDrag
                .data([this.data])
                .attr("cx", 40)
                .attr("cy", function (d) {
                    return parseInt(d.size / 2)
                })
                .attr("rx", 40)
                .attr("ry", function (d) {
                    return parseInt(d.size / 2)
                })
        } else if (this.model == 'diamond') {
            var point = "0," + parseInt(this.data.size / 2) + " 40," + 0 + " 80," + parseInt(this.data.size / 2) + " 40," + this.data.size
            if (this.elementBack) {
                this.elementBack
                    .data([this.data])
                    .attr("points", point)
            }
            this.elementDrag
                .data([this.data])
                .attr("points", point)
        } else if (this.model == 'polygon') {

        }
    }

    defaultDragStart(d) {
        //console.log('startDrag')
    }

    defaultDrag(d) {
        //var node = d3.select(this.parentNode);
        //console.log('dragging')
        d.x = d3.event.dx + d.x
        d.y = d3.event.dy + d.y
        if (d.x > 5) {
            d.x = 5
        }
        if ((-d.x) + 105 > d.containerWidth) {
            d.x = -(d.containerWidth - 105);
        }
        if (d.y < 5) {
            d.y = 5;
        }
        if (d.y + d.size + 15 > d.containerHeight) {
            d.y = d.containerHeight - 15 - d.size;
        }
        d3.select(this).attr("transform", "translate(" + d.x + "," + d.y + ")");
    }

    defaultDragEnd(d) {
        //console.log('drag end')
        //此处应该关联到工作区的callback
        var topFlag = true
        if (d.parent && d.parent.workDataCoordinate && d.parent.workDataCoordinate.length > 0) {
            for (var i = 0; i < d.parent.workDataCoordinate.length; i++) {
                var item = d.parent.workDataCoordinate[i];
                if ((item.x1 <= (d.containerWidth + d.x - 100)) && ((d.containerWidth + d.x - 100) <= item.x2 ) && (item.y1 <= d.y) && ( d.y <= item.y2)) {
                    if (d.parent.props.type == "actions" &&
                        ((d.type == "action" && item.data.type == "action") ||
                        ((d.type == "position" || d.type == "role") && (item.data.type == "position" || item.data.type == "role")))) {
                        Toast.createToast.bind(this, dragDropRules.dragToastData, 'error')()
                    } else if (d.type == "action" && item.data.childId && item.data.childId.length > 0) {
                        Toast.createToast.bind(this, dragDropRules.dragToastData2, 'error')()
                    } else {
                        //do contact
                        //console.log("next")
                        //Modal.createModal.bind(this,{modalValues:dragModalData,type:'message',children:defaultDragDropForm})()
                        //use action
                        //SHALL base on the condition give the data related the data to show in the form
                        var data = {type: d.type, level: parseInt(item.data.level) + 1}
                        d.parent.showElementFrom({operationType: "add", data, dataRelated: item.data})
                    }
                    topFlag = false
                    break;
                }
            }
            if (d.type == "action") {
                topFlag = false
            }
            if (d.parent.props.type == "positions" && d.parent.props.workData && d.parent.props.workData[0] && d.parent.props.workData[0].length > 0) {
                topFlag = false
            }
        } else if (d.parent && !d.parent.workDataCoordinate) {
            if (d.type == "action") {
                topFlag = false
            }
        }
        if (topFlag) {
            var data = {type: d.type, level: 0}
            d.parent.showElementFrom({operationType: "add", data, dataRelated: null})
        }
        d.x = d.initX
        d.y = d.initY
        d3.select(this).attr("transform", "translate(" + d.x + "," + d.y + ")");
    }
}