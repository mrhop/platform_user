//--DEMOtABLE STRUCTURE
let endpointsLocal = {
    getTableUrl: endpoints.users,
    deleteTableRowUrl: endpoints.deleteuser
}


export class UserListWrapper extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        let symbol = 'table-user-lists'
        return <Table.RowEditableTable minHeight={300} addUrl={baseUrl+'user/add.html'}
                                       updateUrl={baseUrl+'user/info.html'} endpoints={endpointsLocal}
                                       symbol={symbol}  {...this.props}/>
    }
}


export class UserUpdateWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.serverFailureModalData = {
            title: '更新用户出错',
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
        ReactRouter.browserHistory.push(baseUrl + "user/list.html");
    }

    render() {
        let symbol = 'form-user-update'
        return <Form.HorizontalForm url={endpoints.userupdate} callback={this.callback.bind(this)}
                                    initUrl={endpoints.userinfo+'?key='+this.props.location.query.key}
                                    updateUrl={endpoints.userinfooptionupdate+'?key='+this.props.location.query.key}
                                    submitedRouteUrl={baseUrl+"user/list.html"}
                                    backup={this.backup}
                                    symbol={symbol}/>
    }
}

export class UserAddWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.serverFailureModalData = {
            title: '新增用户出错',
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

    render() {
        let symbol = 'form-user-add'
        return <Form.HorizontalForm url={endpoints.usersave} callback={this.callback.bind(this)}
                                    initUrl={endpoints.useradd}
                                    updateUrl={endpoints.useraddoptionupdate}
                                    submitedRouteUrl={baseUrl+"user/list.html"}
                                    symbol={symbol}/>
    }
}

