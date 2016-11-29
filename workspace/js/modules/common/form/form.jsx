/**
 * Created by Donghui Huo on 2016/5/13.
 */
require('./form.scss');
import {initFormDispatch, confirmFormDispatch, updateFormDispatch, resetForm} from './actions'
import Text from './elements/text.jsx'
import Textarea from './elements/textarea.jsx'
import Checkbox from './elements/checkbox.jsx'
import Radio from './elements/radio.jsx'
import SelectWrapper from './elements/selectWrapper.jsx'
import Datetime from './elements/datetime.jsx'
class BasicForm extends React.Component {
    constructor(props) {
        super(props);
        //此处需要处理一下callback,设置一下将save按钮的可用性设置
        this.serverFailureModalData = {
            content: <span>Server error</span>,
            title: 'check the url and server configure ',
            footerCloseButton: {
                visible: true,
                title: 'close',
            },
            footerContent: <span>Form confirm Error</span>,
        }
        this.state = {data: {}, init: true, initRule: null};

    }

    componentWillMount() {
        //init action,设置 rule
        this.props.initFormDispatch({endpoint: this.props.initUrl, formKey: this.props.symbol});
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.init) {
            if (!this.state.initRule) {
                this.state.initRule = nextProps.rule
            }
            this.state.init = false;
            const {structure} = nextProps.rule
            if (this.formType === 'blockForm') {
                for (var index in structure) {
                    let item = structure[index]
                    for (var subIndex in item) {
                        let subItem = item[subIndex]
                        if (subItem.type == 'daterange') {
                            this.state.data[subItem['name']] = {};
                            this.state.data[subItem['name']].dateTimeStart = subItem['defaultStartValue'] ? subItem['defaultStartValue'] : null;
                            this.state.data[subItem['name']].dateTimeEnd = subItem['defaultEndValue'] ? subItem['defaultEndValue'] : null;
                        } else if (subItem.type == 'checkbox') {
                            var stateData = null
                            if (subItem['defaultValue']) {
                                stateData = []
                                for (var i = 0; i < subItem['defaultValue'].length; i++) {
                                    stateData.push(subItem['defaultValue'][i]);
                                }
                            }
                            this.state.data[subItem['name']] = stateData;
                        } else {
                            this.state.data[subItem['name']] = (subItem['defaultValue'] == 0 || subItem['defaultValue']) ? subItem['defaultValue'] : null;
                        }
                    }
                }
            } else {
                structure.forEach(function (item) {
                    if (item.type == 'daterange') {
                        this.state.data[item['name']] = {};
                        this.state.data[item['name']].dateTimeStart = item['defaultStartValue'] ? item['defaultStartValue'] : null;
                        this.state.data[item['name']].dateTimeEnd = item['defaultEndValue'] ? item['defaultEndValue'] : null;
                    } else if (item.type == 'checkbox') {
                        var stateData = null
                        if (item['defaultValue']) {
                            stateData = []
                            for (var i = 0; i < item['defaultValue'].length; i++) {
                                stateData.push(item['defaultValue'][i]);
                            }
                        }
                        this.state.data[item['name']] = stateData;
                    } else {
                        this.state.data[item['name']] = (item['defaultValue'] == 0 || item['defaultValue']) ? item['defaultValue'] : null;
                    }
                }.bind(this))
            }
        }
        if (nextProps.rule && nextProps.update && nextProps.update.status) {
            //update rule的处理
            nextProps.update.status = false;
            const {structure} = nextProps.rule
            if (this.formType === 'blockForm') {
                for (var index in structure) {
                    let item = structure[index]
                    for (var subIndex in item) {
                        let subItem = item[subIndex]
                        if (subItem.changed) {
                            if (subItem.type == 'daterange') {
                                this.state.data[subItem['name']] = {};
                                this.state.data[subItem['name']].dateTimeStart = subItem['defaultStartValue'] ? subItem['defaultStartValue'] : null;
                                this.state.data[subItem['name']].dateTimeEnd = subItem['defaultEndValue'] ? subItem['defaultEndValue'] : null;
                            } else if (subItem.type == 'checkbox') {
                                var stateData = null
                                if (subItem['defaultValue']) {
                                    stateData = []
                                    for (var i = 0; i < subItem['defaultValue'].length; i++) {
                                        stateData.push(subItem['defaultValue'][i]);
                                    }
                                }
                                this.state.data[subItem['name']] = stateData;
                            } else {
                                this.state.data[subItem['name']] = (subItem['defaultValue'] == 0 || subItem['defaultValue']) ? subItem['defaultValue'] : null;
                            }
                        }
                        if (subItem['name'] == nextProps.updateElement) {
                            nextProps.rule.structure[index][subIndex]['defaultValue'] = nextProps.updateData;
                        }
                    }
                }
            } else {
                structure.forEach(function (item, index) {
                    if (item.changed) {
                        if (item.type == 'daterange') {
                            this.state.data[item['name']] = {};
                            this.state.data[item['name']].dateTimeStart = item['defaultStartValue'] ? item['defaultStartValue'] : null;
                            this.state.data[item['name']].dateTimeEnd = item['defaultEndValue'] ? item['defaultEndValue'] : null;
                        } else if (item.type == 'checkbox') {
                            var stateData = null
                            if (item['defaultValue']) {
                                stateData = []
                                for (var i = 0; i < item['defaultValue'].length; i++) {
                                    stateData.push(item['defaultValue'][i]);
                                }
                            }
                            this.state.data[item['name']] = stateData;
                        } else {
                            this.state.data[item['name']] = (item['defaultValue'] == 0 || item['defaultValue']) ? item['defaultValue'] : null;
                        }
                    }
                    if (item['name'] == nextProps.updateElement) {
                        nextProps.rule.structure[index]['defaultValue'] = nextProps.updateData;
                    }
                }.bind(this))
            }
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.status && nextProps.status === 'serverFailure') {
            if (nextProps.failureCallback) {
                nextProps.failureCallback(nextProps)
            } else {
                this.serverFailureModalData.content = <p>{nextProps.message}</p>
                Modal.createModal.bind(this, {modalValues: this.serverFailureModalData, type: 'messageError'})();
            }
        }
        if (nextProps.status && nextProps.status === 'success') {
            this.props.submitProcess.status = true
            if (this.props.callback) {
                if (this.props.callback(nextProps.responseData) && this.props.submitedRouteUrl) {
                    ReactRouter.browserHistory.push(this.props.submitedRouteUrl);
                }
            } else {
                if (this.props.submitedRouteUrl) {
                    ReactRouter.browserHistory.push(this.props.submitedRouteUrl);
                }
            }

        }
        return true;
    }

    reset(e) {
        this.state.init = true;
        this.props.resetForm({rule: this.state.initRule, formKey: this.props.symbol});
        e.preventDefault()
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.props.submitProcess.status) {
            this.props.submitProcess.status = true
            this.forceUpdate();
            this.props.confirmFormDispatch({
                data: this.state.data,
                formKey: this.props.symbol,
                url: this.props.url
            });
        }
    }

    handleUpdate(args) {
        if (!this.props.submitProcess.status) {
            this.props.submitProcess.status = true
            this.forceUpdate();
            this.props.updateFormDispatch(args);
        }
    }

    generateFormElement(id, rule, name) {
        var changeFun = null;
        var changeArgs = null;
        if (rule.updatable) {
            //可更新
            changeFun = this.handleUpdate.bind(this);
            changeArgs = {
                rule: this.props.rule,
                formKey: this.props.symbol,
                updateElement: name,
                endpoint: this.props.updateUrl ? this.props.updateUrl : this.props.initUrl,
            }
        }
        if (!rule.type || rule.type === 'text' || rule.type === 'email' ||
            rule.type === 'password' || rule.type === 'number'
            || rule.type === 'hidden' || rule.type === 'file') {
            return <Text key={id} formType={this.formType} rule={rule} onchangeargs={changeArgs} onchange={changeFun}
                         id={id}
                         data={this.state.data} name={name}/>
        } else if (rule.type === 'radio') {
            return <Radio key={id} formType={this.formType} rule={rule} onchangeargs={changeArgs} onchange={changeFun}
                          id={id}
                          data={this.state.data} name={name}/>
        } else if (rule.type === 'checkbox') {
            return <Checkbox key={id} formType={this.formType} rule={rule} onchangeargs={changeArgs}
                             onchange={changeFun} id={id}
                             data={this.state.data} name={name}/>
        } else if (rule.type === 'select') {
            return <SelectWrapper key={id} formType={this.formType} onchangeargs={changeArgs} onchange={changeFun}
                                  rule={rule} id={id}
                                  data={this.state.data}
                                  name={name}/>
        } else if (rule.type === 'textarea') {
            return <Textarea key={id} formType={this.formType} rule={rule} onchangeargs={changeArgs}
                             onchange={changeFun} id={id}
                             data={this.state.data} name={name}/>
        } else if (rule.type === 'date' || rule.type === 'daterange' || rule.type === 'time' || rule.type === 'datetime') {
            return <Datetime key={id} formType={this.formType} rule={rule} onchangeargs={changeArgs}
                             onchange={changeFun} id={id}
                             data={this.state.data} name={name}/>
        }
    }


    //formExtraClass other layout
    renderBasic() {
        let actionClasses = 'action'
        switch (this.formType) {
            case 'horizontalForm':
                actionClasses = classNames(actionClasses, 'col-sm-10')
        }
        if (this.props.rule) {
            const rule = this.props.rule;
            const {structure, submit, reset, actions} = rule
            var formDivClasses = classNames(this.formType, this.props.extraClassName)

            var submitClasses = classNames('btn btn-primary', this.props.submitProcess.status ? 'disabled' : null);
            var submitElement = null;
            if (submit) {
                submitElement =
                    <button type="button" className={submitClasses}
                            onClick={this.handleSubmit.bind(this)}>{submit.label ? submit.label : 'Submit'}</button>;
            }
            var resetElement = null;
            if (reset) {
                resetElement =
                    <button type="button" className="btn btn-warning"
                            onClick={this.reset.bind(this)}>{reset.label ? reset.label : 'Reset'}</button>;
            }
            var actionElements = null
            if (actions) {
                actionElements = actions.map(function (item, index) {
                    var className = classNames("btn", item.extraClassName)
                    return <button key={index} type="button" className={className}
                                   onClick={item.action&&typeof item.action ==="string"?this.props[item.action]:item.action}>{item.label}</button>;
                }, this)
            }
            if (this.formType === 'defaultForm' || this.formType === 'inlineForm' || this.formType === 'noLabelForm' || this.formType === 'horizontalForm') {
                let formElements = structure.map(function (item, index) {
                    if (item.available == undefined) {
                        let id = this.props.symbol + '-element-' + index;
                        //this.state.data[item['name']] = item['defaultValue'] ? item['defaultValue'] : null;
                        return this.generateFormElement(id, item, item['name'])
                    } else {
                        return null
                    }
                    //this.state.data[item['name']]
                }, this)
                return <div className={formDivClasses}>
                    <form id={this.props.symbol} onSubmit={this.handleSubmit.bind(this)}>
                        {formElements}
                        <div className={actionClasses}>
                            <div className="submit">
                                {submitElement}
                            </div>
                            <div className="reset">
                                {resetElement}
                            </div>
                            {actions && <div className="actions">
                                {actionElements}
                            </div>}
                        </div>
                    </form>
                </div>
            } else if (this.formType === 'blockForm') {
                let rows = structure.map(function (item, index) {
                    var indexTmp;
                    var length = 0
                    for (indexTmp in item) {
                        if (!item[indexTmp].type || item[indexTmp].type !== 'hidden') {
                            length++;
                        }
                    }
                    let size = parseInt(12 / length);
                    let formElements = item.map(function (subItem, subIndex) {
                        if (subItem.available == undefined) {
                            let id = this.props.symbol + '-element-' + index + '-' + subIndex;
                            //this.state.data[subItem['name']] = subItem['defaultValue'] ? subItem['defaultValue'] : null;
                            const formElement = this.generateFormElement(id, subItem, subItem['name']);
                            return subItem.type === 'hidden' ? formElement :
                                <div key={subIndex} className={"col col-sm-" + size}>
                                    {formElement}
                                </div>
                        } else {
                            return null
                        }
                    }, this)
                    return <div className="row" key={index}>{formElements}</div>
                }, this);
                return <div className={formDivClasses}>
                    <form id={this.props.symbol}>
                        {rows}
                        <div className={actionClasses}>
                            <div className="submit">
                                {submitElement}
                            </div>
                            <div className="reset">
                                {resetElement}
                            </div>
                            {actions && <div className="actions">
                                {actionElements}
                            </div>}
                        </div>
                    </form>
                </div>
            }
        }
        return null;
    }
}

class DefaultForm extends BasicForm {
    constructor(props) {
        super(props);
        this.formType = 'defaultForm'
    }

    render() {
        return (this.renderBasic());
    }
}

class InlineForm extends BasicForm {
    constructor(props) {
        super(props);
        this.formType = 'inlineForm'

    }

    render() {
        return (super.renderBasic());
    }
}

class NoLabelForm extends BasicForm {
    constructor(props) {
        super(props);
        this.formType = 'noLabelForm'
    }

    render() {
        return (super.renderBasic());
    }
}

class HorizontalForm extends BasicForm {
    constructor(props) {
        super(props);
        this.formType = 'horizontalForm'
    }

    render() {
        return (super.renderBasic());
    }
}

class BlockForm extends BasicForm {
    constructor(props) {
        super(props);
        this.formType = 'blockForm'
    }

    render() {
        return (super.renderBasic());
    }
}

BasicForm.propTypes = {
    type: React.PropTypes.string,
    extraClassName: React.PropTypes.string,
    url: React.PropTypes.any,
    callback: React.PropTypes.func,
    failureCallback: React.PropTypes.func,
    symbol: React.PropTypes.any,
    rule: React.PropTypes.object,
    status: React.PropTypes.string,
    message: React.PropTypes.string,
    responseData: React.PropTypes.object,
    confirmFormDispatch: React.PropTypes.func,
    submitProcess: React.PropTypes.object
}
BasicForm.defaultProps = {
    submitProcess: {status: false}
}


function mapStateToProps(state, ownProps) {
    if (ownProps.symbol && state && state.form && state.form.main[ownProps.symbol]) {
        const {
            rule,
            status,
            message,
            responseData,
            submitProcess,
            update,
            updateElement,
            updateData
        } = state.form.main[ownProps.symbol]
        return {rule, status, message, responseData, submitProcess, update, updateElement, updateData}
    } else {
        return {};
    }
}

module.exports = {
    DefaultForm: ReactRedux.connect(mapStateToProps, {
        initFormDispatch,
        confirmFormDispatch,
        updateFormDispatch,
        resetForm
    })(DefaultForm),
    InlineForm: ReactRedux.connect(mapStateToProps, {
        initFormDispatch,
        confirmFormDispatch,
        updateFormDispatch,
        resetForm
    })(InlineForm),
    NoLabelForm: ReactRedux.connect(mapStateToProps, {
        initFormDispatch,
        confirmFormDispatch,
        updateFormDispatch,
        resetForm
    })(NoLabelForm),
    HorizontalForm: ReactRedux.connect(mapStateToProps, {
        initFormDispatch,
        confirmFormDispatch,
        updateFormDispatch,
        resetForm
    })(HorizontalForm),
    BlockForm: ReactRedux.connect(mapStateToProps, {
        initFormDispatch,
        confirmFormDispatch,
        updateFormDispatch,
        resetForm
    })(BlockForm)
};