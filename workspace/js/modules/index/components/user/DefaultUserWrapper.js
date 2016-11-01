//--DEMOtABLE STRUCTURE

let endpointsLocal = {
    getTableUrl: endpoints.users
}


export class UserListWrapper extends React.Component {

    render() {
        let symbol = 'table-user-lists'
        return <Table.HoverTable minHeight={300} endpoints={endpointsLocal}
                                 symbol={symbol}  {...this.props}/>
    }
}

