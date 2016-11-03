const tableRowSchema = new normalizr.Schema('tableData', {
    idAttribute: rowData => rowData.key
})
export const Schemas = {
    TableDataRow: tableRowSchema,
    TableData: normalizr.arrayOf(tableRowSchema)
}

export const TABLE_REQUEST = 'TABLE_REQUEST'
export const TABLE_SUCCESS = 'TABLE_SUCCESS'
export const TABLE_FAILURE = 'TABLE_FAILURE'

export const TABLE_ROW_DELETE_REQUEST = 'TABLE_ROW_DELETE_REQUEST'
export const TABLE_ROW_DELETE_SUCCESS = 'TABLE_ROW_DELETE_SUCCESS'
export const TABLE_ROW_DELETE_FAILURE = 'TABLE_ROW_DELETE_FAILURE'


export const TABLE_ROW_ADD_REQUEST = 'TABLE_ROW_ADD_REQUEST'
export const TABLE_ROW_ADD_SUCCESS = 'TABLE_ROW_ADD_SUCCESS'
export const TABLE_ROW_ADD_FAILURE = 'TABLE_ROW_ADD_FAILURE'


export const TABLE_ROW_UPDATE_REQUEST = 'TABLE_ROW_UPDATE_REQUEST'
export const TABLE_ROW_UPDATE_SUCCESS = 'TABLE_ROW_UPDATE_SUCCESS'
export const TABLE_ROW_UPDATE_FAILURE = 'TABLE_ROW_UPDATE_FAILURE'


export const TABLE_COLUMN_UPDATE_REQUEST = 'TABLE_COLUMN_UPDATE_REQUEST'
export const TABLE_COLUMN_UPDATE_SUCCESS = 'TABLE_COLUMN_UPDATE_SUCCESS'
export const TABLE_COLUMN_UPDATE_FAILURE = 'TABLE_COLUMN_UPDATE_FAILURE'

function getTable(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'POST',
            types: [TABLE_REQUEST, TABLE_SUCCESS, TABLE_FAILURE],
            //because need to set some other things ,so can not give the schema
            //schema: Schemas.TableData,
            endpoint: requestCondition.endpoint,
        },
        requestCondition
    }
}
export function getTableDispatch(requestCondition = {
    filters: null,
    sort: null,
    rowSize: null,
    currentPage: 0,
}) {
    return (dispatch, getState) => {
        return dispatch(getTable(requestCondition))
    }
}
function deleteTableRow(requestCondition = {key: null}) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'delete',
            types: [TABLE_ROW_DELETE_REQUEST, TABLE_ROW_DELETE_SUCCESS, TABLE_ROW_DELETE_FAILURE],
            //because need to set some other things ,so can not give the schema
            //schema: Schemas.TableData,
            endpoint: requestCondition.endpoint,
        },
        requestCondition
    }
}
export function deleteTableRowDispatch(requestCondition = {key: null}) {
    return (dispatch, getState) => {
        return dispatch(deleteTableRow(requestCondition))
    }
}

export function callbackFailure(data) {
    var modalValue = {
        content: <span>操作失败,请检查网络连接状况</span>,
        title:'操作失败',
        footerCloseButton: {
            visible: true,
            title: '关闭',
        }
    }
    Modal.createModal.bind(this, {modalValues: modalValue, type: 'messageError'})();
}

function addTableRow(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'POST',
            types: [TABLE_ROW_ADD_REQUEST, TABLE_ROW_ADD_SUCCESS, TABLE_ROW_ADD_FAILURE],
            //because need to set some other things ,so can not give the schema
            //schema: Schemas.TableData,
            endpoint: requestCondition.endpoint,
        },
        requestCondition
    }
}
export function addTableRowDispatch(requestCondition = {}) {
    return (dispatch, getState) => {
        return dispatch(addTableRow(requestCondition))
    }
}

function updateTableRow(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'POST',
            types: [TABLE_ROW_UPDATE_REQUEST, TABLE_ROW_UPDATE_SUCCESS, TABLE_ROW_UPDATE_FAILURE],
            schema: Schemas.TableDataRow,
            endpoint: requestCondition.endpoint,
        },
        requestCondition
    }
}
export function updateTableRowDispatch(requestCondition = {}) {
    return (dispatch, getState) => {
        return dispatch(updateTableRow(requestCondition))
    }
}

function updateTableColumn(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'POST',
            types: [TABLE_COLUMN_UPDATE_REQUEST, TABLE_COLUMN_UPDATE_SUCCESS, TABLE_COLUMN_UPDATE_FAILURE],
            schema: Schemas.TableDataRow,
            endpoint: requestCondition.endpoint,
        },
        requestCondition
    }
}
export function updateTableColumnDispatch(requestCondition = {key,}) {
    return (dispatch, getState) => {
        return dispatch(updateTableColumn(requestCondition))
    }
}

//refresh
export function refreshTableDispatch(params = {symbol,}) {
    return (dispatch, getState) => {
        const {
            requestCondition
        } = getState().table.main[params.symbol]
        return dispatch(getTable(requestCondition))
    }
}
