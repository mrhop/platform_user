import * as ActionTypes from '../actions'


function main(state = {}, action) {
    if (action.type === ActionTypes.FORM_INIT_SUCCESS) {
        //from 初始化时设置，判断id是否存在
        state[action.requestCondition.formKey] = {}
        if (action.response && action.response.responseData) {
            state[action.requestCondition.formKey].rule = action.response.responseData;
        }
        state[action.requestCondition.formKey].status = 'init';
        state[action.requestCondition.formKey].submitProcess = {status: false};
        return l_merge({}, state)
    }

    if (action.type === ActionTypes.FORM_UPDATE_SUCCESS) {
        //from 初始化时设置，判断id是否存在
        state[action.requestCondition.formKey] = {}
        if (action.response && action.response.responseData) {
            state[action.requestCondition.formKey].rule = action.response.responseData;
            state[action.requestCondition.formKey].updateElement = action.requestCondition.updateElement;
            state[action.requestCondition.formKey].updateData = action.requestCondition.updateData;
        }
        state[action.requestCondition.formKey].status = 'update';
        state[action.requestCondition.formKey].update = {status: true};
        state[action.requestCondition.formKey].submitProcess = {status: false};
        return l_merge({}, state)
    }
    if (action.type === ActionTypes.FORM_VALIDATE_FAILURE) {
        state[action.formKey].rule.structure = action.structure
        state[action.formKey].submitProcess = {status: false};
        return l_merge({}, state)
    }

    if (action.type === ActionTypes.FORM_POST_SUCCESS) {
        //将action.response和 validateFailureMsg 合并,并返回;
        state[action.requestCondition.formKey].submitProcess = {status: false};
        if (action.response) {
            state[action.requestCondition.formKey].status = action.response.status;
            if (action.response.message) {
                state[action.requestCondition.formKey].message = action.response.message;
            }
            if (action.response.responseData) {
                state[action.requestCondition.formKey].responseData = action.response.responseData;
            }
        }
        return l_merge({}, state)
    }

    if (action.type === ActionTypes.FORM_POST_FAILURE) {
        state[action.requestCondition.formKey].submitProcess = {status: false};
        state[action.requestCondition.formKey].status = 'serverFailure';
        state[action.requestCondition.formKey].failureMsg = action.error;
        return l_merge({}, state)
    }

    if (action.type === ActionTypes.FORM_RESET) {
        //from 初始化时设置，判断id是否存在
        state[action.formKey] = {}
        state[action.formKey].rule = action.rule;
        state[action.formKey].status = 'init';
        state[action.formKey].submitProcess = {status: false};
        return l_merge({}, state)
    }
    return state
}

export default Redux.combineReducers({main})