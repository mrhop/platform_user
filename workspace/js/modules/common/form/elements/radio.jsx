/**
 * Created by Donghui Huo on 2016/5/13.
 */
require('./radio.scss');

export default class Radio extends React.Component {
    constructor(props) {
        super(props);

    }

    onChange(e) {
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
        if (this.props.rule.validated != undefined) {
            this.props.rule.validated = true;
        }
        if (this.props.rule.errorMsg != undefined) {
            this.props.rule.errorMsg = null;
        }
        if(this.props.onchange){
            this.props.onchangeargs.updateData = item;
            this.props.onchange(this.props.onchangeargs);
        }
        this.forceUpdate();
    }

    render() {

        const rule = this.props.rule;
        let eleClassNames = classNames('radio-wrapper', (rule.validated === undefined || rule.validated) ? null : 'has-error', rule.className);
        let labelClassNames = null
        let errorBlockClassNames = 'error-block';

        switch (this.props.formType) {
            case 'horizontalForm':
                labelClassNames = 'col-sm-2'
                errorBlockClassNames = classNames(errorBlockClassNames, 'col-sm-10')
        }
        let items = rule.items.map(function (item, index) {
            return <li key={index}>
                <input type="radio" id={this.props.id + '-' + index} name={rule.name} value={item.value}
                       onChange={this.onChange.bind(this)}
                       checked={this.props.data[this.props.name] ? ((this.props.data[this.props.name] === (item.value)) ? 'checked' : false) : false}/>
                <label htmlFor={this.props.id + '-' + index}>
                    <span>{item.label}</span>
                </label>
            </li>
        }, this);
        return <div className={eleClassNames} id={this.props.id}>
            <label
                className={labelClassNames}>{rule.label ? rule.label : null}{rule.label && rule.required ?
                <span className="required">*</span> : null}</label>
            {this.props.formType === 'horizontalForm' ?
                <div className="col-sm-10">
                    <ul className="radio"> {items}</ul>
                </div> : <ul className="radio"> {items}</ul> }
            {(rule.validated === undefined || rule.validated) ? null :
                <span className={errorBlockClassNames}>{rule.errorMsg}</span>}
        </div>
    }
}


Radio.propTypes = {rule: React.PropTypes.object};
Radio.propTypes = {data: React.PropTypes.string};
Radio.propTypes = {id: React.PropTypes.string};
Radio.propTypes = {formType: React.PropTypes.string};

