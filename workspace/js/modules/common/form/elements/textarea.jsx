/**
 * Created by Donghui Huo on 2016/5/13.
 */
require('./textarea.scss');
const defaultRows = 10

//基本text
export default class Textarea extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange(e) {

        this.props.data[this.props.name] = e.target.value;
        if (this.props.rule.validated != undefined) {
            this.props.rule.validated = true;
        }
        if (this.props.rule.errorMsg != undefined) {
            this.props.rule.errorMsg = null;
        }
        this.forceUpdate();
    }

    render() {
        const rule = this.props.rule;
        let eleClassNames = classNames('form-group', (rule.validated === undefined || rule.validated) ? null : 'has-error', rule.className);
        let eleStyle = rule.type === 'hidden' ? {display: 'none'} : null;
        //validate 需要class 和tooltip放置，根据props的改变来做
        //data-validate = {rule.validate} validate shall not be here
        let inputClassNames = classNames('form-control', 'textarea');
        let labelClassNames = null
        let errorBlockClassNames = 'error-block';


        let textareaElement = <textarea className={inputClassNames} cols="2"
                                          rows={(this.props.formType === 'inlineForm' || this.props.formType === 'blockForm') ? 1 : (rule.rows ? rule.rows : defaultRows) }
                                          id={this.props.id} name={rule.name} placeholder={rule.placeholder}
                                          onChange={this.onChange.bind(this)} value = {this.props.data[this.props.name] ? this.props.data[this.props.name] : ''}>

            </textarea>
        switch (this.props.formType) {
            case  'horizontalForm':
                labelClassNames = 'col-sm-2'
                errorBlockClassNames = classNames(errorBlockClassNames, 'col-sm-10')
                textareaElement = <div className="col-sm-10 input-wrapper">
                    {textareaElement}
                </div>
            case  'inlineForm':
                textareaElement =
                    <div className="textarea-first-wrapper">{textareaElement}</div>
        }

        return <div className={eleClassNames} style={eleStyle}><label
            htmlFor={this.props.id}
            className={labelClassNames}>{rule.label ? rule.label : null}{rule.label && rule.required ?
            <span className="required">*</span> : null}</label>
            {textareaElement }
            {(rule.validated === undefined || rule.validated) ? null :
                <span className={errorBlockClassNames}>{rule.errorMsg}</span>}
        </div>;
    }
}


Textarea.propTypes = {rule: React.PropTypes.object};
Textarea.propTypes = {data: React.PropTypes.object};
Textarea.propTypes = {id: React.PropTypes.string};
Textarea.propTypes = {name: React.PropTypes.string};
Textarea.propTypes = {formType: React.PropTypes.string};

