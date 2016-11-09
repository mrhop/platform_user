require('./LoginInternal.scss');
import {VALIDATE_RULE} from '../../common/form/actions'
import {initClientLoginDispatch} from '../actions/login';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {submitProcess: false}
        this.submitUrl = endpoints.gettokenbypassword;
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
            {endpoint: endpoints.gettokenbyclient})
    }

    componentWillReceiveProps(nextProps) {
    }


    render() {
        return this.props.clientValidated ? <div className='auth-block'>
            <h1>{commonProperties['platform.name']}</h1>
            <Form.HorizontalForm url={this.submitUrl} failureCallback={this.callbackFailure.bind(this)}
                                 callback={this.callbackSuccess.bind(this)}
                                 initUrl={endpoints.initlogin}
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
            clientValidated,
            commonProperties
        } = state.client
        return {clientValidated,commonProperties}
    } else {
        return {};
    }
}

const reactLogin = ReactRedux.connect(mapStateToProps, {
    initClientLoginDispatch
})(Login)

export default reactLogin
