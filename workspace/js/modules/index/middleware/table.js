//index demo table----------------------------------------------------------------------------

//--schema
const demoTableRowSchema = new normalizr.Schema('demoTableData', {
    idAttribute: rowData => rowData.key
})
export const Schemas = {
    DemoTableRow: demoTableRowSchema,
    DemoTable: normalizr.arrayOf(demoTableRowSchema)
}
//--DEMOtABLE STRUCTURE
export const demoTableRules = {
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
export const rowEditableAdditionalFeature = {
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


export default store=>
    next => action => {
        //now do nothing,just to the next layer
        return next(action)
    }
