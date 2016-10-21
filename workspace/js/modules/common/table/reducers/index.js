import * as ActionTypes from '../actions'

function main(state = {}, action) {
    if (action.type === ActionTypes.TABLE_SUCCESS) {
        state[action.requestCondition.symbol].keys = action.response.result
        state[action.requestCondition.symbol].requestCondition = action['requestCondition'];
        state[action.requestCondition.symbol].tableRefresh = false;
        return l_merge({}, state, action.response.entities, {totalCount: 23})
    }
    if (action.type === ActionTypes.INDEX_DEMO_TABLE_DELETE_SUCCESS ||
        action.type === ActionTypes.INDEX_DEMO_TABLE_ADD_SUCCESS) {
        return l_merge({}, state, {demoTableRefresh: true})
    }
    return state
}

//shall do nothing ,but use the data get back from server the render,this is just the test to see the state change
//recatch data = true
function demoTableDelete(state = {}, action) {
    if (action.type === ActionTypes.INDEX_DEMO_TABLE_DELETE_SUCCESS) {
    }
    return state
}



export default Redux.combineReducers({demoTable, demoTableDelete})