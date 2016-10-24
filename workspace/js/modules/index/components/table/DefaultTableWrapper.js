//--DEMOtABLE STRUCTURE
let demoTableRules = {
    thead: [{
        className: 'td-id',
        title: '#',
        value: 'serialNum',
        sort: 'asc',
        filter: false
    }, {
        title: 'First Name',
        value: 'firstName',
        filter: true,
        editable: true,
        addable: true,
        editType: 'select',
        columnEditable: true,
        editValue: [{label: 'select 1', value: 'Mark'}, {label: 'select 2', value: 'Mark1'}]
    }, {
        title: 'Last Name', value: 'lastName', filter: true, editable: true, addable: true, columnEditable: true,
        editType: 'radio', editValue: [{label: 'type 1', value: 'Otto'}, {label: 'type 2', value: 'Otto1'}]
    }, {
        title: 'Username',
        value: 'username',
        filter: true,
        editable: true,
        addable: true,
        columnEditable: true,//single column edit
        editType: 'text'
    }, {
        title: 'Email',
        value: 'email',
        columnEditable: true,
        editable: true,
        editType: 'text',
        addable: true,
        filter: true
    }, {
        title: 'Age',
        value: 'age',
        filter: true,
        editable: true,
        addable: true,
        editType: 'checkbox',
        columnEditable: true,
        editValue: [{label: '31', value: '31'}, {label: '32', value: '32'}]
    }],
    tfoot: [{
        className: 'td-foot',
        colSpan: 7,
        title: 'this is the footer for this table'
    }]
};
let rowEditableAdditionalFeature = {
    extraClass: 'hover',
    sortAvailable: true,
    filterAvailable: true,
    pager: {
        show: true,
        rowSize: {
            show: true
        }
    }
};
let endpoints = {
    getTableUrl:'/demoData/table/tableData.json',
    addTableRowUrl:'/demoData/table/addData.json',
    deleteTableRowUrl:'/demoData/table/deleteData.json',
    updateTableRowUrl:'/demoData/table/updateData.json',
    updateTableColumnUrl:'/demoData/table/updateData.json'
}

let endpointsRowEdit = {
    getTableUrl:'/demoData/table/tableData1.json',
    addTableRowUrl:'/demoData/table/addData.json',
    deleteTableRowUrl:'/demoData/table/deleteData.json',
    updateTableRowUrl:'/demoData/table/updateData.json',
    updateTableColumnUrl:'/demoData/table/updateData.json'
}

export class BorderTableWrapper extends React.Component {

    render() {
        let symbol = 'table-' + 'base-table-1'
        return <Table.BorderTable minHeight={300} endpoints={endpoints}
                                  symbol={symbol} {...this.props} />
    }
}
export class CondensedTableWrapper extends React.Component {

    render() {
        let symbol = 'table-' + 'base-table-2'
        return  <Table.CondensedTable minHeight={300} endpoints={endpoints}
                                      symbol={symbol}  {...this.props} />
    }

}

export class HoverTableWrapper extends React.Component {

    render() {
        let symbol = 'table-' + 'base-table-3'
        return  <Table.HoverTable minHeight={300} endpoints={endpoints}
                                  symbol={symbol}  {...this.props}/>
    }
}


export class StripedTableWrapper extends React.Component {

    render() {
        let symbol = 'table-' + 'base-table-4'
        return  <Table.StripedTable minHeight={300}  endpoints={endpoints}
                                  symbol={symbol} {...this.props} />
    }
}


export class DefaultTableWrapper extends React.Component {

    render() {
        let symbol = 'table-' + 'base-table-5'
        return  <Table.DefaultTable minHeight={300} endpoints={endpoints}
                                    symbol={symbol} {...this.props}/>
    }
}

export class RowEditableTableWrapper extends React.Component {
    render() {
        let symbol = 'table-' + 'base-table-6'
        return  <Table.RowEditableTable minHeight={300} endpoints={endpointsRowEdit}
                                    symbol={symbol}  {...this.props}/>
    }
}

