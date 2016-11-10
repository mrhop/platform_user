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
    }

    callback(data) {
        console.log('the data:' + data)
    }

    render() {
        let symbol = 'form-user-update'
        return <Form.HorizontalForm url={endpoints.userupdate} callback={this.callback}
                                    initUrl={endpoints.userinfo+'?key='+this.props.location.query.key}
                                    updateUrl={endpoints.userinfooptionupdate+'?key='+this.props.location.query.key}
                                    symbol={symbol}/>
    }
}

