//--DEMOtABLE STRUCTURE
let endpointsLocal = {
    getTableUrl: endpoints.clients,
    deleteTableRowUrl: endpoints.clientdelete
}


export class ClientListWrapper extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        let symbol = 'table-client-lists'
        return <Table.RowEditableTable minHeight={300} addUrl={baseUrl+'client/add.html'}
                                       updateUrl={baseUrl+'client/info.html'} endpoints={endpointsLocal}
                                       symbol={symbol}  {...this.props}/>
    }
}


export class ClientUpdateWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.serverFailureModalData = {
            title: '更新客户端出错',
            footerCloseButton: {
                visible: true,
                title: '关闭',
            }
        }
    }


    callback(data) {
        if (data && data.data && data.data.message) {
            this.serverFailureModalData.content = data.data.message
            Modal.createModal.bind(this, {modalValues: this.serverFailureModalData, type: 'messageError'})()
            return false
        }
        return true
    }

    backup() {
        ReactRouter.browserHistory.push(baseUrl + "client/list.html");
    }

    render() {
        let symbol = 'form-client-update'
        return <Form.HorizontalForm url={endpoints.clientupdate} callback={this.callback.bind(this)}
                                    initUrl={endpoints.clientinfo+'?key='+this.props.location.query.key}
                                    submitedRouteUrl={baseUrl+"client/list.html"}
                                    backup={this.backup}
                                    symbol={symbol}/>
    }
}

export class ClientAddWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.serverFailureModalData = {
            title: '新增客户端出错',
            footerCloseButton: {
                visible: true,
                title: '关闭',
            }
        }
        this.serverSuccess= {
            title: '新增客户端成功',
            footerCloseButton: {
                visible: true,
                title: '关闭',
            }
        }
    }

    callback(data) {
        if (data && data.data && data.data.message) {
            this.serverFailureModalData.content = data.data.message
            Modal.createModal.bind(this, {modalValues: this.serverFailureModalData, type: 'messageError'})()
            return false
        }else{
            this.serverSuccess.content = "保存成功"
            Modal.createModal.bind(this, {modalValues: this.serverSuccess, type: 'messageSuccess'})()
        }
        return true
    }

    render() {
        let symbol = 'form-client-add'
        return <Form.HorizontalForm url={endpoints.clientsave} callback={this.callback.bind(this)}
                                    initUrl={endpoints.clientadd}
                                    symbol={symbol}/>
    }
}

