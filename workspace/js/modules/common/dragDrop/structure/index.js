/**
 * Created by Donghui Huo on 2016/8/10.
 */
import {VALIDATE_RULE} from '../../../common/form/actions'
export default {
    defaultActionChoices: [
        {label: '一票通过', value: 'single'},
        {label: '多票通过', value: 'multi'},
        {label: '全票通过', value: 'all'}],
    cleanWorkflowDialog: {
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
    }, dragModalData: {
        title: '设置属性',
        footerCloseButton: {
            visible: false,
        }
    }, dragToastData: {
        content: <span>不能将角色和职位关联，行为和行为关联</span>,
        title: '拖拽错误'
    }, dragToastData2: {
        content: <span>每个职位或角色只能有一个关联行为</span>,
        title: '拖拽错误'
    },deleteElementDialog: {
        content: <span>If you confirm this, this element will be deleted</span>,
        title: 'Do you want to delete this element?',
        footerConfirmButton: {
            callback: function () {
                this.deleteElement();
            },
            title: 'Confirm',
        },
        footerCloseButton: {
            visible: true,
            title: 'Cancel',
        },
    },saveFlowForm: {
        structure: [{
            name: 'flowName',
            label: '名称',
            type: 'text',
            placeholder: '请输入工作流名称',
            required: true,
            validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
        },{
            name: 'desc',
            label: '详细说明',
            type: 'textarea',
            rows: 3,
            placeholder: '说明',
        }],
        submit: {label: '保存'},
        reset: {label: '重置'},
    }, saveFlowModalData: {
        title: '保存工作流',
        footerCloseButton: {
            visible: false,
        }
    },



}