//import {DefaultForm, NoLabelForm, HorizontalForm, InlineForm, BlockForm} from '../../../common/form/form.jsx'
import {VALIDATE_RULE} from '../../../common/form/actions'
//let url = 'demoData/formData/basicForm.json'
let url = 'http://localhost:8081/userclient/oauth2client/test'
let callback = function (data) {
    //console.log('the data:' + data)
}
let initRule = {
    structure: [{
        
        name: 'testText',
        defaultValue: 'not null',
        label: 'TestText',
        type: 'text',
        placeholder: 'give some words',
        required: true,
        validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name}]
    }, {
        name: 'testNum',
        defaultValue: '1',
        label: 'TestNum',
        type: 'number',
        placeholder: 'shall be just number',
        required: true,
        validateRules: [{name: 'custom_validate', validateRegex: '^(-?\\d+)(\\.\\d+)?$', errorMsg: '必须为数字'}]
    }, {
        name: 'testDate',
        defaultValue: '2011-11-11',
        label: 'TestDate',
        type: 'date',
        placeholder: 'shall be just date',
        dateFormat: 'YYYY-MM-DD',
        required: true,
        validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
    }, {
        name: 'testDateRange',
        defaultStartValue: '2011/11/11',
        defaultEndValue: '2011/11/15',
        label: 'TestDateRange',
        type: 'daterange',
        placeholder: 'shall be just date',
        required: true,
        validateRules: [[{
            name: VALIDATE_RULE.REQUIRED_VALIDATE.name,
            errorMsg: '起始时间不能为空'
        }], [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '结束时间不能为空'}]]
    }, {
        name: 'testFile',
        label: 'TestFile1',
        type: 'file',
        placeholder: 'shall be just file',
        required: true,
        validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
    }, {
        name: 'testTextarea',
        label: 'TestTextarea',
        type: 'textarea',
        placeholder: 'shall be just textarea',
        required: true,
        rows: 10,
        defaultValue: '<div>text</div>',
        validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
    }, {
        name: 'testCheckbox',
        items: [{value: 1, label: 'label1'}, {value: 2, label: 'label2'}],
        label: 'TestCheckBox',
        type: 'checkbox',
        dataType: "number",
        required: true,
        validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
    }, {
        name: 'testRadio',
        items: [{value: 1, label: 'label1'}, {value: 2, label: 'label2'}],
        label: 'TestRadio',
        type: 'radio',
        required: true,
        dataType: "number",
        validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
    }, {
        name: 'testPassword',
        label: 'TestPassword',
        type: 'password',
        validateRules: [{
            name: 'custom_validate',
            validateRegex: '^(?![a-zA-z]+$)(?!\\d+$)(?![!@#$%^&*]+$)[a-zA-Z\\d!@#$%^&*]{6,15}$',
            errorMsg: '至少包含数字，字母以及特殊字符【!@#$%^&*】中任意两种,并在6-15字符之间'
        }]
    }, {
        name: 'testHidden',
        type: 'hidden',
        defaultValue: 'you can not see it',
    }, {
        label: 'TestEmail',
        name: 'testEmail',
        type: 'email',
        defaultValue: 'a@a.com',
        validateRules: [{
            name: 'custom_validate',
            validateRegex: '^([\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+)$',
            errorMsg: '只能为电子邮件'
        }]
    }, {
        name: 'testSelect',
        label: 'Test Select',
        type: 'select',
        items: [{label: 'select 1', value: 'select1'}, {label: 'select 2', value: 'select2'}],
        required: true,
        validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
    }],
    submit: {label: '保存'},
    reset: {label: '重置'},
    actions:[{label:'删除',extraClassName: 'btn-danger'}]
}

let initBlockRule = {
    structure: [[{
        name: 'testText',
        defaultValue: 'not null',
        label: 'TestText',
        type: 'text',
        placeholder: 'give some words',
        required: true,
        validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
    }, {
        name: 'testNum',
        defaultValue: '1',
        label: 'TestNum',
        type: 'number',
        placeholder: 'shall be just number',
        required: true,
        validateRules: [{name: 'custom_validate', validateRegex: '^(-?\\d+)(\\.\\d+)?$', errorMsg: '必须为数字'}]
    }, {
        name: 'testCheckbox',
        defaultValue: [1, 2],
        items: [{value: 1, label: 'label1'}, {value: 2, label: 'label2'}],
        label: 'TestCheckBox',
        type: 'checkbox',
        dataType: "number",
        required: true,
        validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
    }, {
        name: 'testFile',
        label: 'TestFile1',
        type: 'file',
        placeholder: 'shall be just file',
        required: false,
        validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
    }, {
        name: 'testTextarea',
        label: 'TestTextarea',
        type: 'textarea',
        placeholder: 'shall be just textarea',
        required: true,
        rows: 10,
        defaultValue: '<div>text</div>',
        validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
    }], [{
        name: 'testSelect',
        label: 'Test Select',
        type: 'select',
        defaultValue: 'select2',
        items: [{label: 'select 1', value: 'select1'}, {label: 'select 2', value: 'select2'}],
        required: true,
        validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
    }, {
        name: 'testRadio',
        items: [{value: 1, label: 'label1'}, {value: 2, label: 'label2'}],
        dataType: "number",
        label: 'TestRadio',
        type: 'radio',
        required: true,
        validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
    }, {
        name: 'testPassword',
        label: 'TestPassword',
        type: 'password',
        validateRules: [{
            name: 'custom_validate',
            validateRegex: '^(?![a-zA-z]+$)(?!\\d+$)(?![!@#$%^&*]+$)[a-zA-Z\\d!@#$%^&*]{6,15}$',
            errorMsg: '至少包含数字，字母以及特殊字符【!@#$%^&*】中任意两种,并在6-15字符之间'
        }]
    }, {
        name: 'testHidden',
        type: 'hidden',
        defaultValue: 'you can not see it',
    }, {
        label: 'TestEmail',
        name: 'testEmail',
        type: 'email',
        defaultValue: 'a@a.com',
        validateRules: [{
            name: 'custom_validate',
            validateRegex: '^([\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+)$',
            errorMsg: '只能为电子邮件'
        }]
    }], [
        {
            name: 'testDate',
            defaultValue: '2011/11/11',
            label: 'TestDate',
            type: 'date',
            placeholder: 'shall be just date',
            required: true,
            validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
        }, {
            name: 'testDateRange',
            defaultStartValue: '2011/11/11',
            defaultEndValue: '2011/11/15',
            label: 'TestDateRange',
            type: 'daterange',
            placeholder: 'shall be just date',
            required: true,
            validateRules: [[{
                name: VALIDATE_RULE.REQUIRED_VALIDATE.name,
                errorMsg: '起始时间不能为空'
            }], [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '结束时间不能为空'}]]
        }
    ]],
    submit: {label: '保存'},
    reset: {label: '重置'},
    actions:[{extraClassName: 'btn-danger',label:'删除'}]
}
export class DefaultFormWrapper extends React.Component {

    render() {
        let extraClassName = 'test-default-form';

        let symbol = 'form-' + 'index-demo-default'
        return <Form.DefaultForm extraClassName={extraClassName} url={url} callback={callback} initRule={initRule}
                                 symbol={symbol}/>
    }
}

export class NoLabelFormWrapper extends React.Component {

    render() {
        let extraClassName = 'test-nolabel-form';
        let symbol = 'form-' + 'index-demo-nolabel'
        return <Form.NoLabelForm extraClassName={extraClassName} url={url} callback={callback} initRule={initRule}
                                 symbol={symbol}/>
    }
}
export class HorizontalFormWrapper extends React.Component {

    render() {
        let extraClassName = 'test-horizontal-form';
        let symbol = 'form-' + 'index-demo-horizontal'
        return <Form.HorizontalForm extraClassName={extraClassName} url={url} callback={callback} initRule={initRule}
                                    symbol={symbol}/>
    }
}

export class InlineFormWrapper extends React.Component {

    render() {
        let extraClassName = 'test-inline-form';
        let symbol = 'form-' + 'index-demo-inline'
        return <Form.InlineForm extraClassName={extraClassName} url={url} callback={callback} initRule={initRule}
                                symbol={symbol}/>
    }
}

export class BlockFormWrapper extends React.Component {

    render() {
        let extraClassName = 'test-block-form';
        let symbol = 'form-' + 'index-demo-block'
        return <Form.BlockForm extraClassName={extraClassName} url={url} callback={callback} initRule={initBlockRule}
                               symbol={symbol}/>
    }
}