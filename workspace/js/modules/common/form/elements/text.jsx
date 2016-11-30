/**
 * Created by Donghui Huo on 2016/5/13.
 */
require('./text.scss');

//基本text
export default class Text extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange(e) {
        if (this.props.rule.type === 'file') {
            if (!this.props.data[this.props.name]) {
                this.props.data[this.props.name] = {}
            }
            this.props.data[this.props.name][this.props.id] = {files: e.target.files, value: e.target.value};
        } else {
            var item = e.target.value;
            if(this.props.rule.dataType ){
                if(this.props.rule.dataType == "number" ){
                    if(!isNaN(item) ){
                        item =  Number(item)
                    }
                }else if(this.props.rule.dataType == "boolean" ){
                    item =  Boolean(item)
                }
            }
            this.props.data[this.props.name] = item;
        }
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
        let inputClassNames = classNames('form-control', (rule.type ? rule.type : 'text'));
        let labelClassNames = null
        let errorBlockClassNames = 'error-block';

        switch (this.props.formType) {
            case 'horizontalForm':
                labelClassNames = 'col-sm-2'
                errorBlockClassNames = classNames(errorBlockClassNames, 'col-sm-10')
        }
        var opts = {};
        if(rule.readonly ){
            opts['readOnly'] = 'readOnly';
        }
        var readonly
        const inputElement = <input className={inputClassNames} id={this.props.id} type={rule.type ? rule.type : 'text'}
                                    name={rule.name} placeholder={rule.placeholder}
                                    value={(this.props.data[this.props.name] == 0 || this.props.data[this.props.name]) ? (rule.type === 'file' ? (this.props.data[this.props.name][this.props.id] ? this.props.data[this.props.name][this.props.id].value : '') : this.props.data[this.props.name]) : ''}
                                    autoComplete={rule.autocomplete !== undefined ? rule.autocomplete : true}
                                    onChange={this.onChange.bind(this)} {...opts}/>
        return <div className={eleClassNames} style={eleStyle}><label
            htmlFor={this.props.id}
            className={labelClassNames}>{rule.label ? rule.label : null}{rule.label && rule.required ?
            <span className="required">*</span> : null}</label>
            {this.props.formType === 'horizontalForm' ?
                <div className="col-sm-10 input-wrapper">{inputElement}</div> : inputElement }
            {(rule.validated === undefined || rule.validated) ? null :
                <span className={errorBlockClassNames}>{rule.errorMsg}</span>}
        </div>;
    }
}


Text.propTypes = {rule: React.PropTypes.object};
Text.propTypes = {data: React.PropTypes.object};
Text.propTypes = {id: React.PropTypes.string};
Text.propTypes = {name: React.PropTypes.string};
Text.propTypes = {formType: React.PropTypes.string};

