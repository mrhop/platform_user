//--DEMOtABLE STRUCTURE

let endpointsLocal = {
    getTableUrl: endpoints.roles
}


export class RoleListWrapper extends React.Component {

    render() {
        let symbol = 'table-role-lists'
        return <Table.HoverTable minHeight={300} endpoints={endpointsLocal}
                                 symbol={symbol}  {...this.props}/>
    }
}

