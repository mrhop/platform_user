/**
 * Created by Donghui Huo on 2016/5/13.
 */
require('react-datepicker/dist/react-datepicker.css');
require('./datetime.scss');
import DatePicker from 'react-datepicker'
const DATE_FORMAT = 'YYYY/MM/DD';
//基本text
export default class DateTime extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange(type, e) {
        if (!type) {
            this.props.data[this.props.name] = e;
        } else if (type == 'start') {
            var endDatetime = this.props.data[this.props.name].dateTimeEnd;
            if (endDatetime && moment(e).isAfter(endDatetime)) {
                this.props.data[this.props.name].dateTimeStart = endDatetime;
                this.props.data[this.props.name].dateTimeEnd = e
            } else {
                this.props.data[this.props.name].dateTimeStart = e;
                if (!endDatetime) {
                    this.props.data[this.props.name].dateTimeEnd = e;
                }
            }
        } else if (type == 'end') {
            var startDatetime = this.props.data[this.props.name].dateTimeStart;
            if (startDatetime && moment(e).isBefore(startDatetime)) {
                this.props.data[this.props.name].dateTimeEnd = startDatetime
                this.props.data[this.props.name].dateTimeStart = e;
            } else {
                this.props.data[this.props.name].dateTimeEnd = e;
                if (!startDatetime) {
                    this.props.data[this.props.name].dateTimeStart = e;
                }
            }
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
        let eleClassNames = classNames('datetime-wrapper', (rule.validated === undefined || rule.validated) ? null : 'has-error', rule.className);

        let labelClassNames = null
        let errorBlockClassNames = 'error-block';

        switch (this.props.formType) {
            case 'horizontalForm':
                labelClassNames = 'col-sm-2'
                errorBlockClassNames = classNames(errorBlockClassNames, 'col-sm-10')
        }

        let datetimeElement = null
        if (rule.type === 'date') {
            datetimeElement = <div className={rule.type}><DatePicker
                showYearDropdown
                isClearable={true}
                locale={locale.toLowerCase()}
                                                                        fixedHeight id={this.props.id}
                                                                     dateFormat={rule.dateFormat ? rule.dateFormat : DATE_FORMAT}
                                                                     selected={this.props.data[this.props.name] ?
                                                                     ( typeof this.props.data[this.props.name] === 'string' ?
                                                                      moment(this.props.data[this.props.name],(rule.dateFormat ? rule.dateFormat :DATE_FORMAT)) : moment(this.props.data[this.props.name]))
                                                                      : null}
                                                                     placeholderText={rule.placeholder}
                                                                     locale={locale}
                                                                     todayButton={'今天'}
                                                                     onChange={this.onChange.bind(this,null)}/></div>
        } else if (rule.type === 'daterange') {
            var dateTimeStart = this.props.data[this.props.name] ? this.props.data[this.props.name].dateTimeStart : null
            var dateTimeEnd = this.props.data[this.props.name] ? this.props.data[this.props.name].dateTimeEnd : null
            var dateTimeStartClass = classNames(rule.type, (rule.validated !== undefined && !rule.validated) ? (!rule.dateTimeStartValidated ? 'has-error' : null) : null)
            var dateTimeEndClass = classNames(rule.type, (rule.validated !== undefined && !rule.validated) ? (!rule.dateTimeEndValidated ? 'has-error' : null) : null)
            var datetimeStartEle = <div className={dateTimeStartClass}><DatePicker
                showYearDropdown
                isClearable={true}
                locale={locale.toLowerCase()}
                                                                            fixedHeight id={this.props.id}
                                                                                   dateFormat={rule.dateFormat ? rule.dateFormat : DATE_FORMAT}
                                                                                   selected={dateTimeStart ?
                                                                         ( typeof dateTimeStart === 'string' ?
                                                                          moment(dateTimeStart,(rule.dateFormat ? rule.dateFormat : DATE_FORMAT)) : moment(dateTimeStart))
                                                                          : null}
                                                                                   startDate={dateTimeStart ?
                                                                         ( typeof dateTimeStart === 'string' ?
                                                                          moment(dateTimeStart,(rule.dateFormat ? rule.dateFormat : DATE_FORMAT)) : moment(dateTimeStart))
                                                                          : null}
                                                                                   endDate={dateTimeEnd ?
                                                                         ( typeof dateTimeEnd === 'string' ?
                                                                          moment(dateTimeEnd,(rule.dateFormat ? rule.dateFormat : DATE_FORMAT)) : moment(dateTimeEnd))
                                                                          : null}
                                                                                   placeholderText={rule.placeholder}
                                                                                   locale={locale}
                                                                                   todayButton={'今天'}
                                                                                   onChange={this.onChange.bind(this,'start')}/>
            </div>
            var datetimeEndEle = <div className={dateTimeEndClass}><DatePicker fixedHeight id={this.props.id}
                                                                               showYearDropdown
                                                                               isClearable={true}
                                                                               locale={locale.toLowerCase()}
                                                                               dateFormat={rule.dateFormat ? rule.dateFormat : DATE_FORMAT}
                                                                               selected={dateTimeEnd ?
                                                                         ( typeof dateTimeEnd === 'string' ?
                                                                          moment(dateTimeEnd,(rule.dateFormat ? rule.dateFormat : DATE_FORMAT)) : moment(dateTimeEnd))
                                                                          : null}
                                                                               startDate={dateTimeStart ?
                                                                         ( typeof dateTimeStart === 'string' ?
                                                                          moment(dateTimeStart,(rule.dateFormat ? rule.dateFormat : DATE_FORMAT)) : moment(dateTimeStart))
                                                                          : null}
                                                                               endDate={dateTimeEnd ?
                                                                         ( typeof dateTimeEnd === 'string' ?
                                                                          moment(dateTimeEnd,(rule.dateFormat ? rule.dateFormat : DATE_FORMAT)) : moment(dateTimeEnd))
                                                                          : null}
                                                                               placeholderText={rule.placeholder}
                                                                               locale={locale}
                                                                               todayButton={'今天'}
                                                                               onChange={this.onChange.bind(this,'end')}/>
            </div>
            datetimeElement =
                <div className="daterange-wrapper">{datetimeStartEle}<span>至</span>{datetimeEndEle}</div>

        }
        return <div className={eleClassNames}><label
            htmlFor={this.props.id}
            className={labelClassNames}>{rule.label ? rule.label : null}{rule.label && rule.required ?
            <span className="required">*</span> : null}</label>
            {this.props.formType === 'horizontalForm' ?
                <div className="col-sm-10 input-wrapper">{datetimeElement}</div> : datetimeElement }
            {(rule.validated === undefined || rule.validated) ? null :
                <span className={errorBlockClassNames}>{rule.errorMsg}</span>}
        </div>;
    }
}


DateTime.propTypes = {rule: React.PropTypes.object};
DateTime.propTypes = {data: React.PropTypes.object};
DateTime.propTypes = {id: React.PropTypes.string};
DateTime.propTypes = {name: React.PropTypes.string};
DateTime.propTypes = {formType: React.PropTypes.string};

