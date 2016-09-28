import * as ActionTypes from '../actions'


function main(state = {}, action) {
    if (action.type === ActionTypes.INIT_WORK_FLOW_SUCCESS) {
        //INIT env
        state[action.requestCondition.symbol] = {flow:{}}
        if (action.response) {
            state[action.requestCondition.symbol].flow = {
                data: action.response.data,
                flowId: action.response.flowId,
                flowName: action.response.flowName
            }
            if (action.requestCondition.url) {
                if (window.localStorage) {
                    window.localStorage["work_flow::" + action.requestCondition.symbol] = JSON.stringify(action.response)
                }
            }
        }
        return l_merge({}, state)
    }
    if (action.type === ActionTypes.ROLES_GET_SUCCESS) {
        //get need rows
        if (action.response) {
            state[action.requestCondition.symbol].roles = action.response;
        }
        return l_merge({}, state)
    }

    if (action.type === ActionTypes.POSITIONS_GET_SUCCESS) {
        //get need rows
        if (action.response) {
            state[action.requestCondition.symbol].positions = action.response;
        }
        return l_merge({}, state)
    }

    if (action.type === ActionTypes.SHOW_SAVE_WORK_FLOW_FORM) {
            state[action.requestCondition.symbol].saveFlowVisible = true
            return l_merge({}, state)
    }

    if (action.type === ActionTypes.HIDE_SAVE_WORK_FLOW_FORM) {
        state[action.requestCondition.symbol].saveFlowVisible = false
        return l_merge({}, state)
    }

    if (action.type === ActionTypes.SAVE_WORK_FLOW_SUCCESS) {
        state[action.requestCondition.symbol].saveFlowVisible = false
        if (action.response.responseData && action.response.responseData.flowId) {
            state[action.requestCondition.symbol].flow.flowId = action.response.responseData.flowId
            if (window.localStorage) {
                window.localStorage["work_flow::" + action.requestCondition.symbol] = JSON.stringify(state[action.requestCondition.symbol].flow)
            }
            return l_merge({}, state)
        }
        return state
    }


    if (action.type === ActionTypes.CLEAN_WORK_GROUP) {
        state[action.requestCondition.symbol].flow.data = null;
        return l_merge({}, state)
    }

    if (action.type === ActionTypes.SHOW_ELEMENT_FORM) {
        state[action.requestCondition.symbol].addFormVisible = true
        state[action.requestCondition.symbol].dragElementForm = action.requestCondition.dragElementForm
        state[action.requestCondition.symbol].dragModalData = action.requestCondition.dragModalData
        return l_merge({}, state)
    }
    if (action.type === ActionTypes.HIDE_ELEMENT_FORM) {
        state[action.requestCondition.symbol].addFormVisible = false
        state[action.requestCondition.symbol].dragElementForm = null
        state[action.requestCondition.symbol].dragModalData = null
        return l_merge({}, state)
    }

    if (action.type === ActionTypes.AFTER_SAVE_ELEMENT) {
        if (action.data) {
            state[action.requestCondition.symbol].flow.data = action.data
        } else {
            var dataInput = action.requestCondition.data
            var data = state[action.requestCondition.symbol].flow.data;
            state[action.requestCondition.symbol].flow.data = ActionTypes.saveOrUpdateElement(data, dataInput)
        }
        state[action.requestCondition.symbol].addFormVisible = false
        state[action.requestCondition.symbol].dragElementForm = null
        state[action.requestCondition.symbol].dragModalData = null
        return l_merge({}, state)
    }
    if (action.type === ActionTypes.DELETE_ELEMENT) {
        if (action.data) {
            state[action.requestCondition.symbol].flow.data = action.data
        } else {
            var data = state[action.requestCondition.symbol].data
            var item = action.requestCondition.nowDelete;
            state[action.requestCondition.symbol].flow.data = ActionTypes.deleteElementInternal(item,data)
        }
        state[action.requestCondition.symbol].addFormVisible = false
        state[action.requestCondition.symbol].dragElementForm = null
        state[action.requestCondition.symbol].dragModalData = null
        return l_merge({}, state)
    }
    return state
}

export default Redux.combineReducers({main})