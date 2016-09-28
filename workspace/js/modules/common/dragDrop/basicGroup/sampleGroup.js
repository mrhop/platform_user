/**
 * Created by Donghui Huo on 2016/5/13.
 */
import CommonElement from '../basicElement/commonElement';

export default class SampleGroup {
    constructor(parent, data) {
        this.data = data;
        this.parent = parent;
        this.svgContainer = this.parent.d3.svgContainer;
        this.sampleGroup = this.svgContainer.append("g")
            .attr("class", "sample-group")
        this.baseReact = this.sampleGroup.append("rect")
            .attr("class", "sample-base-react")

        this.innerElements = []
        if (this.data) {
            this.data.forEach(function (item) {
                let commonElement = new CommonElement(this.parent,this.sampleGroup,item);
                this.innerElements.push(commonElement);
            }.bind(this))
        }
    }

    resize(containerWidth, containerHeight) {
        this.sampleGroup.attr("x", (containerWidth - 100))
            .attr("transform", "translate(" + (containerWidth - 100) + ",0)")
        this.baseReact
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 90)
            .attr("height", containerHeight - 50);
        if (this.innerElements.length > 0) {
            var height = parseInt((containerHeight - 60 - 15 * this.innerElements.length) / this.innerElements.length)
            var size = height > 40 ? 40 : height
            var top = 15
            this.innerElements.forEach(function (item, i) {
                item.resize({
                    initX: 5,
                    x: 5,
                    initY: top,
                    y: top,
                    size: size,
                    containerHeight,
                    containerWidth
                })
                top = top + 15 + parseInt(size)
            }.bind(this))

        }

    }


}