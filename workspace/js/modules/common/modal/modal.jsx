/**
 * Created by Donghui Huo on 2016/5/13.
 */
require('./modal.scss');
let modalWrapper = null;
function createModal({modalValues, type, children}) {
    if (!modalWrapper) {
        modalWrapper = document.createElement('div');
        modalWrapper.setAttribute('id', 'modal-wrapper');
        document.body.insertBefore(modalWrapper, document.body.children[document.body.children.length - 1].nextSibling);
    }
    if (!type || type == 'default') {
        ReactDOM.render(<DefaultModal key={UtilFun.uuid()} modalValues={modalValues}
                                      _call={this}>{children ? children : null}</DefaultModal>, modalWrapper);
    } else if (type == 'lgModal') {
        //other creation
        ReactDOM.render(<DefaultLgModal key={UtilFun.uuid()} modalValues={modalValues}
                                        _call={this}>{children ? children : null}</DefaultLgModal>, modalWrapper);
    } else if (type == 'smModal') {
        //other creation
        ReactDOM.render(<DefaultSmModal key={UtilFun.uuid()} modalValues={modalValues}
                                        _call={this}>{children ? children : null}</DefaultSmModal>, modalWrapper);
    } else if (type == 'message') {
        //other creation
        ReactDOM.render(<MessageDefaultModal key={UtilFun.uuid()} modalValues={modalValues}
                                             _call={this}>{children ? children : null}</MessageDefaultModal>, modalWrapper);
    } else if (type == 'messageSuccess') {
        //other creation
        ReactDOM.render(<MessageSuccessModal key={UtilFun.uuid()} modalValues={modalValues}
                                             _call={this}>{children ? children : null}</MessageSuccessModal>, modalWrapper);
    } else if (type == 'messageWarning') {
        //other creation
        ReactDOM.render(<MessageWarningModal key={UtilFun.uuid()} modalValues={modalValues}
                                             _call={this}>{children ? children : null}</MessageWarningModal>, modalWrapper);
    } else if (type == 'messageError') {
        //other creation
        ReactDOM.render(<MessageErrorModal key={UtilFun.uuid()} modalValues={modalValues}
                                           _call={this}>{children ? children : null}</MessageErrorModal>, modalWrapper);
    } else if (type == 'messageConfirm') {
        //other creation
        ReactDOM.render(<MessageConfirmModal key={UtilFun.uuid()} modalValues={modalValues}
                                             _call={this}>{children ? children : null}</MessageConfirmModal>, modalWrapper);
    } else {
        //do nothing
    }
}


class BasicModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {alertVisible: true};
        if (this.props.alertVisible !== undefined) {
            this.state.alertVisible = this.props.alertVisible;
        }
    }


    componentDidMount() {

        this.modalDom.querySelector('.modal-bg').addEventListener('webkitAnimationEnd', function () {
            if (this.modalDom.classList.contains('close')) {
                this.handleAlertDismiss();
            }
        }.bind(this));
        this.modalDom.style.display = 'block';
        this.modalDom.classList.add('open');
        this.modalDom.classList.remove('close');
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.alertVisible !== undefined) {
            this.setState({
                alertVisible: nextProps.alertVisible
            });
        }
    }


    componentDidUpdate() {
        if (this.modalDom) {
            this.modalDom.querySelector('.modal-bg').addEventListener('webkitAnimationEnd', function () {
                if (this.modalDom && this.modalDom.classList.contains('close')) {
                    this.handleAlertDismiss();
                }
            }.bind(this));
            this.modalDom.classList.add('open');
            this.modalDom.classList.remove('close');
        }
    }


    handleAlertDismiss() {
        this.setState({alertVisible: false});
        this.props.modalValues.closeFun && this.props.modalValues.closeFun();
    }

    closeModal(e) {
        var currentDom = e.currentTarget;
        if (!currentDom.classList.contains('modal-dialog')) {
            this.modalDom.classList.remove('open');
            this.modalDom.classList.add('close');
        }
        e.stopPropagation();
    }

    confirmModal(e) {
        this.closeModal(e);
        this.props.modalValues.footerConfirmButton.callback.bind(this.props._call)();
    }

    renderBasic(dialogExtraClass) {
        if (this.state.alertVisible) {
            var classNames = require('classnames');
            var dialogClass = classNames('modal-dialog', dialogExtraClass);
            return (
                <div className="modal-wrapper" ref={(ref) => this.modalDom = ref}>
                    <div className="modal-bg"></div>
                    <div className="modal" onClick={this.closeModal.bind(this)}>
                        <div className={dialogClass} onClick={this.closeModal.bind(this)}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close fa"
                                            style={{color: !this.props.modalValues.title ? '#000' : null}}
                                            onClick={this.closeModal.bind(this)}></button>
                                    <h4 className="modal-title">
                                        {this.props.modalValues.title}
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    {this.props.modalValues.content}
                                    {this.props.children}
                                </div>
                                <div className="modal-footer">
                                    {(this.props.modalValues.footerCloseButton.visible == undefined || this.props.modalValues.footerCloseButton.visible) ? (
                                        <button className="btn btn-primary"
                                                onClick={this.closeModal.bind(this)}>{this.props.modalValues.footerCloseButton.title ? this.props.modalValues.footerCloseButton.title : 'close'}</button>) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

    renderMessageModal(dialogExtraClass, btnClass) {
        if (this.state.alertVisible) {
            var classNames = require('classnames');
            var dialogClass = classNames('modal-dialog message', dialogExtraClass);
            var buttonClass = classNames('btn', btnClass);
            return (
                <div className="modal-wrapper" ref={(ref) => this.modalDom = ref}>
                    <div className="modal-bg"></div>
                    <div className="modal" onClick={this.closeModal.bind(this)}>
                        <div className={dialogClass} onClick={this.closeModal.bind(this)}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <i className="fa"/>
                                    <h4 className="modal-title">
                                        {this.props.modalValues.title}
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    {this.props.modalValues.content}
                                    {this.props.children}
                                </div>
                                <div className="modal-footer">
                                    {dialogExtraClass && (( dialogExtraClass.indexOf('modal-confirm')) > -1) ?
                                        (<button className={buttonClass}
                                                 onClick={this.confirmModal.bind(this)}>{this.props.modalValues.footerConfirmButton.title ? this.props.modalValues.footerConfirmButton.title : 'Confirm'}</button>) : null }
                                    {(this.props.modalValues.footerCloseButton.visible == undefined || this.props.modalValues.footerCloseButton.visible) ? (
                                        <button className={buttonClass}
                                                onClick={this.closeModal.bind(this)}>{this.props.modalValues.footerCloseButton.title ? this.props.modalValues.footerCloseButton.title : 'OK'}</button>) : null}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

class DefaultModal extends BasicModal {
    constructor(props) {
        super(props);
    }

    render() {
        return (this.renderBasic());
    }
}

class DefaultLgModal extends BasicModal {
    constructor(props) {
        super(props);
    }

    render() {
        return (super.renderBasic('modal-lg'));
    }
}

class DefaultSmModal extends BasicModal {
    constructor(props) {
        super(props);
    }

    render() {
        return (super.renderBasic('modal-sm'));
    }
}

class MessageDefaultModal extends BasicModal {
    constructor(props) {
        super(props);
    }

    render() {
        return (super.renderMessageModal(null, 'btn-primary'));
    }
}

class MessageSuccessModal extends BasicModal {
    constructor(props) {
        super(props);
    }

    render() {
        return (super.renderMessageModal('modal-success', 'btn-success'));
    }
}

class MessageWarningModal extends BasicModal {
    constructor(props) {
        super(props);
    }

    render() {
        return (super.renderMessageModal('modal-warning', 'btn-warning'));
    }
}

class MessageErrorModal extends BasicModal {
    constructor(props) {
        super(props);
    }

    render() {
        return (super.renderMessageModal('modal-error', 'btn-danger'));
    }
}

class MessageConfirmModal extends BasicModal {
    constructor(props) {
        super(props);
    }

    render() {
        return (super.renderMessageModal('modal-confirm modal-error', 'btn-confirm btn-danger'));
    }
}

BasicModal.propTypes = {modalValues: React.PropTypes.object};


//modalValues title,content,button-value
//need to deal with the display:none cause no animation question

module.exports = {
    createModal,
    DefaultModal,
    DefaultLgModal,
    DefaultSmModal,
    MessageDefaultModal,
    MessageSuccessModal,
    MessageWarningModal,
    MessageErrorModal,
    MessageConfirmModal
};