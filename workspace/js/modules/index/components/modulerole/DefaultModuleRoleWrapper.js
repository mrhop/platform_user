//--DEMOtABLE STRUCTURE
let endpointsLocal = {
    getTableUrl: endpoints.moduleroles,
    deleteTableRowUrl: endpoints.moduleroledelete
}


export class ModuleRoleListWrapper extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        let symbol = 'table-modulerole-lists'
        return <Table.RowEditableTable minHeight={300} addUrl={baseUrl+'modulerole/add.html'}
                                       updateUrl={baseUrl+'modulerole/info.html'} endpoints={endpointsLocal}
                                       symbol={symbol}  {...this.props}/>
    }
}


export class ModuleRoleUpdateWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.serverFailureModalData = {
            title: '更新模块角色出错',
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
        ReactRouter.browserHistory.push(baseUrl + "modulerole/list.html");
    }

    render() {
        let symbol = 'form-modulerole-update'
        return <Form.HorizontalForm url={endpoints.moduleroleupdate} callback={this.callback.bind(this)}
                                    initUrl={endpoints.moduleroleinfo+'?key='+this.props.location.query.key}
                                    submitedRouteUrl={baseUrl+"modulerole/list.html"}
                                    backup={this.backup}
                                    symbol={symbol}/>
    }
}

export class ModuleRoleAddWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.serverFailureModalData = {
            title: '新增模块角色出错',
            footerCloseButton: {
                visible: true,
                title: '关闭',
            }
        }
        this.serverSuccess= {
            title: '新增模块角色成功',
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
        let symbol = 'form-modulerole-add'
        return <Form.HorizontalForm url={endpoints.modulerolesave} callback={this.callback.bind(this)}
                                    initUrl={endpoints.moduleroleadd}
                                    symbol={symbol}/>
    }
}

