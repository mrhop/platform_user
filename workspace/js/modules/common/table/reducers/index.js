import * as ActionTypes from '../actions'

function main(state = {}, action) {
    if (action.type === ActionTypes.TABLE_SUCCESS) {
        if (!state[action.requestCondition.symbol]) {
            state[action.requestCondition.symbol] = {};
        }
        if (action.response) {
            state[action.requestCondition.symbol].status = action.response.status;
            if (action.response.message) {
                state[action.requestCondition.symbol].message = action.response.message;
            }
        }
        if (action.response && action.response.status == 'success') {
            state[action.requestCondition.symbol].requestCondition = action['requestCondition'];
            state[action.requestCondition.symbol].tableRefresh = false;
            if (action.response.responseData) {
                if (action.response.responseData) {
                    if (action.response.responseData.data) {
                        var camelizedJson = humps.camelizeKeys(action.response.responseData.data)
                        camelizedJson = Object.assign(
                            normalizr.normalize(camelizedJson, ActionTypes.Schemas.TableData)
                        )
                        state[action.requestCondition.symbol].keys = camelizedJson.result;
                        const tableData = state[action.requestCondition.symbol].keys.map(id => camelizedJson.entities.tableData[id]);
                        state[action.requestCondition.symbol].tableData = tableData;
                    } else {
                        state[action.requestCondition.symbol].tableData = null;
                    }
                    if (action.requestCondition.init) {
                        state[action.requestCondition.symbol].tableRules = action.response.responseData.rules;
                        state[action.requestCondition.symbol].additionalFeature = action.response.responseData.additionalFeature;
                    }
                    state[action.requestCondition.symbol].totalCount = action.response.responseData.totalCount;
                    state[action.requestCondition.symbol].rowSize = action.response.responseData.rowSize;
                    state[action.requestCondition.symbol].currentPage = action.response.responseData.currentPage;
                }
                return l_merge({}, state)
            }
        } else {
            ActionTypes.callbackFailure(action.response)
        }
    }
    if (action.type === ActionTypes.TABLE_ROW_ADD_SUCCESS ||
        action.type === ActionTypes.TABLE_ROW_DELETE_SUCCESS) {
        state[action.requestCondition.symbol].tableRefresh = true;

        if (action.response.status == 'success') {
            return l_merge({}, state)
        } else {
            ActionTypes.callbackFailure(action.response)
        }
    }
    return state
}


export default Redux.combineReducers({main})