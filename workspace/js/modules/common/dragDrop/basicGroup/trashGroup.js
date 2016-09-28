/**
 * Created by Donghui Huo on 2016/5/13.
 */
import {cleanWorkflowDialog} from "../actions"
const cleanWorkgroup = {
    content: <span>If you confirm this, the data on the workgroup will be clear</span>,
    title: 'Do you want to clear the workgroup ?',
    footerConfirmButton: {
        callback: function () {
            this.cleanWorkgroup();
        },
        title: 'Confirm',
    },
    footerCloseButton: {
        visible: true,
        title: 'Cancel',
    },
};
export default class TrashGroup {
    constructor(parent) {
        this.parent = parent;
        this.svgContainer = this.parent.d3.svgContainer;
        this.trashGroup = this.svgContainer.append("g")
            .attr("class", "trash-group");
        this.baseTextSave = this.trashGroup.append("text")
            .attr("class", "trash-base-text")
            .text(function (d) {
                return '\ue911'
            }).on("click", function(){
                if(this.parent.props.flowId){
                    this.parent.saveWorkflow.bind(this.parent)()
                }else{
                    this.parent.showSaveWorkflowForm()
                }
            }.bind(this))
        this.baseTextDel = this.trashGroup.append("text")
            .attr("class", "trash-base-text")
            .text(function (d) {
                return '\ue910'
            }).on("click", cleanWorkflowDialog.bind(this, this.parent))

    }

    resize(containerWidth, containerHeight) {
        this.trashGroup
            .attr("transform", "translate(" + (containerWidth - 100) + "," + (containerHeight - 50) + ")")
        this.baseTextSave
            .attr("x", 25)
            .attr("y", 30)
        this.baseTextDel
            .attr("x", 65)
            .attr("y", 30)
    }
}