//--DEMOtABLE STRUCTURE
let endpointsLocal = {
    getTableUrl: endpoints.modules,
    deleteTableRowUrl: endpoints.moduledelete
}


export class ModuleListWrapper extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        let symbol = 'table-module-lists'
        return <Table.RowEditableTable minHeight={300} addUrl={baseUrl+'module/add.html'}
                                       updateUrl={baseUrl+'module/info.html'} endpoints={endpointsLocal}
                                       symbol={symbol}  {...this.props}/>
    }
}


export class ModuleUpdateWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.serverFailureModalData = {
            title: '更新模块出错',
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
        ReactRouter.browserHistory.push(baseUrl + "module/list.html");
    }

    render() {
        let symbol = 'form-module-update'
        return <Form.HorizontalForm url={endpoints.moduleupdate} callback={this.callback.bind(this)}
                                    initUrl={endpoints.moduleinfo+'?key='+this.props.location.query.key}
                                    submitedRouteUrl={baseUrl+"module/list.html"}
                                    updateUrl={endpoints.moduleaddoptionupdate+'?key='+this.props.location.query.key}
                                    backup={this.backup}
                                    symbol={symbol}/>
    }
}

export class ModuleAddWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.serverFailureModalData = {
            title: '新增模块出错',
            footerCloseButton: {
                visible: true,
                title: '关闭',
            }
        }
        this.serverSuccess= {
            title: '新增模块成功',
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
        let symbol = 'form-module-add'
        return <Form.HorizontalForm url={endpoints.modulesave} callback={this.callback.bind(this)}
                                    initUrl={endpoints.moduleadd}
                                    updateUrl={endpoints.moduleaddoptionupdate}
                                    symbol={symbol}/>
    }
}

