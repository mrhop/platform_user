/**
 * Created by Donghui Huo on 2016/6/2.
 */
require('./toast.scss');
let toastWrapper = null;
function createToast(toastValues, type) {
    if (!toastWrapper) {
        var nodeDiv = document.createElement('div')
        document.body.insertBefore(nodeDiv, document.body.children[0]);
        toastWrapper = ReactDOM.render(<ToastWrapper />, nodeDiv);
    }
    //NEED TO COMPONENT
    if (!type || type == 'default') {
        toastWrapper.addToast(<DefaultToast key={UtilFun.uuid()} toastValues={toastValues}/>);
    } else if (type == 'success') {
        //other creation  
        toastWrapper.addToast(<SuccessToast key={UtilFun.uuid()} toastValues={toastValues}/>);
    } else if (type == 'warning') {
        //other creation
        toastWrapper.addToast(<WarningToast key={UtilFun.uuid()} toastValues={toastValues}/>);
    } else if (type == 'error') {
        //other creation
        toastWrapper.addToast(<ErrorToast key={UtilFun.uuid()} toastValues={toastValues}/>);
    } else {
        //do nothing
    }
}

class ToastWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: []};
        this.addToast = this.addToast.bind(this);
    }

    addToast(toast) {
        this.state.data.unshift(toast);
        this.forceUpdate();
    }

    render() {
        return (<div id="toast-container" className="right-top">{this.state.data}</div> );
    }
}

class BasicToast extends React.Component {

    constructor(props) {
        super(props);
        this.state = {alertVisible: true};
    }


    handleAlertDismiss() {
        this.setState({alertVisible: false});
    }

    closeToast() {
        if (this.toastDom) {
            this.toastDom.classList.remove('open');
            this.toastDom.classList.add('close');
        }
    }


    componentDidMount() {
        UtilFun.domReady(function () {
            this.toastDom.addEventListener('webkitAnimationEnd', function () {
                if (this.toastDom.classList.contains('close')) {
                    this.handleAlertDismiss();
                }
            }.bind(this));
            window.setTimeout(function () {
                this.closeToast();
            }.bind(this), 3000);
            this.toastDom.style.display = 'block';
            this.toastDom.classList.add('open');
            this.toastDom.classList.remove('close');
        }.bind(this));

    }

    renderBasic(dialogExtraClass) {
        if (this.state.alertVisible) {
            var classNames = require('classnames');
            var dialogClass = classNames('toast', dialogExtraClass);
            return (
                <div className={dialogClass} ref={(ref) => this.toastDom = ref}>
                    <div className="left-icon">
                        <i className="fa"/>
                    </div>
                    <button type="button" className="close fa"
                            onClick={this.closeToast.bind(this)}></button>
                    {this.props.toastValues.title ? <h4 className="toast-title">
                        {this.props.toastValues.title}
                    </h4> : null}
                    {this.props.toastValues.content}
                    {this.props.children}
                </div>
            );
        } else {
            return null;
        }
    }
}

class DefaultToast extends BasicToast {
    constructor(props) {
        super(props);
    }

    render() {
        return (this.renderBasic());
    }
}

class SuccessToast extends BasicToast {
    constructor(props) {
        super(props);
    }

    render() {
        return (this.renderBasic('toast-success'));
    }
}

class WarningToast extends BasicToast {
    constructor(props) {
        super(props);
    }

    render() {
        return (this.renderBasic('toast-warning'));
    }
}

class ErrorToast extends BasicToast {
    constructor(props) {
        super(props);
    }

    render() {
        return (this.renderBasic('toast-error'));
    }
}

//toastValues title,content,button-value
DefaultToast.propTypes = {toastValues: React.PropTypes.object};

module.exports = {
    createToast
};
