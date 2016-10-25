import * as ActionTypes from '../actions/'

function main(state = {}, action) {
    if (action.type === ActionTypes.CHART_SUCCESS) {
        state[action.requestCondition.symbol] = {};
        if (action.response) {
            state[action.requestCondition.symbol].status = action.response.status;
            if (action.response.message) {
                state[action.requestCondition.symbol].message = action.response.message;
            }
            if (action.response.status == 'success') {
                state[action.requestCondition.symbol].data = action.response.responseData
            }
        }
        state[action.requestCondition.symbol].requestCondition = action['requestCondition'];
        return l_merge({}, state)
    }
    return state
}


export default Redux.combineReducers({
    main
})