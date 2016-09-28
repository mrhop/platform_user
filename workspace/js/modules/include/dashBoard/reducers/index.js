import * as ActionTypes from '../actions/'

function leftMenuData(state = {}, action) {
    if (action.type === ActionTypes.DASHBOARD_FRAMEWORK_LEFTMENU_SUCCESS) {
        state.data = action.response
        state.requestCondition = action['requestCondition'];
        return l_merge({}, state)
    }
    if (action.type === '@@router/LOCATION_CHANGE') {
    }
    if (action.type === ActionTypes.DASHBOARD_FRAMEWORK_LEFTMENU_COLLAPSE_CHANGE) {
        let collapse = false
        if(state.collapse !== undefined){
            collapse = !state.collapse
        }
        return l_merge({}, state, {collapse:action.requestCondition.collapse})
    }
    if (action.type === ActionTypes.DASHBOARD_FRAMEWORK_LEFTMENU_SELECT_CHANGE) {

        return l_merge({}, state, {selectedUrl:action.requestCondition.selectedUrl})
    }
    return state
}

export default Redux.combineReducers({leftMenuData})