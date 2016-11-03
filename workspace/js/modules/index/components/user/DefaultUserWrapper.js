//--DEMOtABLE STRUCTURE

let endpointsLocal = {
    getTableUrl: endpoints.users,
    deleteTableRowUrl: endpoints.deleteuser
}


export class UserListWrapper extends React.Component {

    render() {
        let symbol = 'table-user-lists'
        return <Table.RowEditableTable  minHeight={300} addUrl = {baseUrl+'user/add.html'} updateUrl = {baseUrl+'user/info.html'} endpoints={endpointsLocal}
                                 symbol={symbol}  {...this.props}/>
    }
}

