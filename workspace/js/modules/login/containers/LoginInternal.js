require('./LoginInternal.scss');
import {VALIDATE_RULE} from '../../common/form/actions'
import {initClientLoginDispatch} from '../actions/login';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {submitProcess: false}
        this.submitUrl = baseUrl + endpoints.gettokenbypassword;
        this.initRule = {
            structure: [{
                name: 'username',
                label: this.props.intl.formatMessage({id: 'auth.user'}),
                type: 'text',
                placeholder: this.props.intl.formatMessage({id: 'auth.user.placeholder'}),
                required: true,
                validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
            }, {
                name: 'password',
                label: this.props.intl.formatMessage({id: 'auth.password'}),
                type: 'password',
                placeholder: this.props.intl.formatMessage({id: 'auth.password'}),
                required: true,
                validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
            },],
            submit: {label: '登录'}
        }
    }

    callbackFailure(data) {
        var modalValue = {
            content: <span>请确认用户信息正确并有权访问该系统</span>,
            title: '登陆失败',
            footerCloseButton: {
                visible: true,
                title: '关闭',
            }
        }
        Modal.createModal.bind(this, {modalValues: modalValue, type: 'messageError'})();
    }

    callbackSuccess(data) {
        location.href = baseUrl + data.redirect;
    }


    componentWillMount() {

        //data init
        //该属性从何得出
        this.props.initClientLoginDispatch(
            {endpoint: baseUrl + endpoints.gettokenbyclient})
    }


    render() {
        return this.props.clientValidated ? <div className='auth-block'>
            <h1><ReactIntl.FormattedMessage id='auth.signIn'
                                            values={{appName: globalProps['app.name'],adminPlatform: globalProps['app.adminPlatform']}}/>
            </h1>
            <Form.HorizontalForm url={this.submitUrl} failureCallback={this.callbackFailure.bind(this)}
                                 callback={this.callbackSuccess.bind(this)}
                                 initRule={this.initRule}
                                 symbol='form-login'/>
        </div> : null;
    }


}

Login
    .propTypes = {
    clientValidated: React.PropTypes.bool,
    initClientLoginDispatch: React.PropTypes.func.isRequired,
}

function

mapStateToProps(state, ownProps) {
    if (state && state.client) {
        const {
            clientValidated
        } = state.client
        return {clientValidated}
    } else {
        return {};
    }
}

const reactLogin = ReactRedux.connect(mapStateToProps, {
    initClientLoginDispatch
})(Login)

export
default
ReactIntl
    .injectIntl(reactLogin)
