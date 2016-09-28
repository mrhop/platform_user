import {Schemas} from '../middleware/table'

export const INDEX_DEMO_TABLE_REQUEST = 'INDEX_DEMO_TABLE_REQUEST'
export const INDEX_DEMO_TABLE_SUCCESS = 'INDEX_DEMO_TABLE_SUCCESS'
export const INDEX_DEMO_TABLE_FAILURE = 'INDEX_DEMO_TABLE_FAILURE'

export const INDEX_DEMO_TABLE_DELETE_REQUEST = 'INDEX_DEMO_TABLE_DELETE_REQUEST'
export const INDEX_DEMO_TABLE_DELETE_SUCCESS = 'INDEX_DEMO_TABLE_DELETE_SUCCESS'
export const INDEX_DEMO_TABLE_DELETE_FAILURE = 'INDEX_DEMO_TABLE_DELETE_FAILURE'


export const INDEX_DEMO_TABLE_ADD_REQUEST = 'INDEX_DEMO_TABLE_ADD_REQUEST'
export const INDEX_DEMO_TABLE_ADD_SUCCESS = 'INDEX_DEMO_TABLE_ADD_SUCCESS'
export const INDEX_DEMO_TABLE_ADD_FAILURE = 'INDEX_DEMO_TABLE_ADD_FAILURE'


export const INDEX_DEMO_TABLE_UPDATE_REQUEST = 'INDEX_DEMO_TABLE_UPDATE_REQUEST'
export const INDEX_DEMO_TABLE_UPDATE_SUCCESS = 'INDEX_DEMO_TABLE_UPDATE_SUCCESS'
export const INDEX_DEMO_TABLE_UPDATE_FAILURE = 'INDEX_DEMO_TABLE_UPDATE_FAILURE'


export const INDEX_DEMO_TABLE_UPDATE_COLUMN_REQUEST = 'INDEX_DEMO_TABLE_UPDATE_COLUMN_REQUEST'
export const INDEX_DEMO_TABLE_UPDATE_COLUMN_SUCCESS = 'INDEX_DEMO_TABLE_UPDATE_COLUMN_SUCCESS'
export const INDEX_DEMO_TABLE_UPDATE_COLUMN_FAILURE = 'INDEX_DEMO_TABLE_UPDATE_COLUMN_FAILURE'

// /index  &&/ demoTable  action
function getIndexDemoTable(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'get',
            types: [INDEX_DEMO_TABLE_REQUEST, INDEX_DEMO_TABLE_SUCCESS, INDEX_DEMO_TABLE_FAILURE],
            schema: Schemas.DemoTable,
            endpoint: `demoData/table/tableData.json`,
        },
        requestCondition
    }
}
export function getIndexDemoTableDispatch(requestCondition = {
    filters: null,
    sort: null,
    rowSize: null,
    currentPage: 0
}) {
    return (dispatch, getState) => {
        return dispatch(getIndexDemoTable(requestCondition))
    }
}
function deleteDemoTable(requestCondition = {key: null}) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'delete',
            types: [INDEX_DEMO_TABLE_DELETE_REQUEST, INDEX_DEMO_TABLE_DELETE_SUCCESS, INDEX_DEMO_TABLE_DELETE_FAILURE],
            schema: Schemas.DemoTable,
            endpoint: `demoData/table/deleteData.json`,
        },
        requestCondition
    }
}
export function deleteDemoTableDispatch(requestCondition = {key: null}) {
    return (dispatch, getState) => {
        return dispatch(deleteDemoTable(requestCondition))
    }
}

function addDemoTable(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'POST',
            types: [INDEX_DEMO_TABLE_ADD_REQUEST, INDEX_DEMO_TABLE_ADD_SUCCESS, INDEX_DEMO_TABLE_ADD_FAILURE],
            schema: Schemas.DemoTableRow,
            endpoint: `demoData/table/addData.json`,
        },
        requestCondition
    }
}
export function addDemoTableDispatch(requestCondition = {firstName, lastName, username, email, age}) {
    return (dispatch, getState) => {
        return dispatch(addDemoTable(requestCondition))
    }
}

function updateDemoTable(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'POST',
            types: [INDEX_DEMO_TABLE_UPDATE_REQUEST, INDEX_DEMO_TABLE_UPDATE_SUCCESS, INDEX_DEMO_TABLE_UPDATE_FAILURE],
            schema: Schemas.DemoTableRow,
            endpoint: `demoData/table/updateData.json`,
        },
        requestCondition
    }
}
export function updateDemoTableDispatch(requestCondition = {key, firstName, lastName, username, email, age}) {
    return (dispatch, getState) => {
        return dispatch(updateDemoTable(requestCondition))
    }
}

function updateColumnDemoTable(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'POST',
            types: [INDEX_DEMO_TABLE_UPDATE_COLUMN_REQUEST, INDEX_DEMO_TABLE_UPDATE_COLUMN_SUCCESS, INDEX_DEMO_TABLE_UPDATE_COLUMN_FAILURE],
            schema: Schemas.DemoTableRow,
            endpoint: `demoData/table/updateData.json`,
        },
        requestCondition
    }
}
export function updateColumnDemoTableDispatch(requestCondition = {key,}) {
    return (dispatch, getState) => {
        return dispatch(updateColumnDemoTable(requestCondition))
    }
}

//refresh
export function refreshDemoTableDispatch() {
    return (dispatch, getState) => {
        const {
            requestCondition
        } = getState().dashBoard.demoTable
        return dispatch(getIndexDemoTable(requestCondition))
    }
}
