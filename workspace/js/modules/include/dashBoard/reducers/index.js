import * as ActionTypes from '../actions/'

function leftMenuData(state = {}, action) {
    var data = {};
    if (action.type === '@@router/LOCATION_CHANGE') {
        state.selectedUrl = action.payload.pathname;
        if(state.selectedUrl === baseUrl){
            state.selectedTitle = null;
            return state;
        }
        var checkable = false;
        if(state.data&&state.data.responseData){
            state.data.responseData.data.content.map(function (item) {
                if(item.moduleUrl === action.payload.pathname){
                    state.selectedTitle = item.moduleName;
                    checkable = true;
                    return;
                }
                if (item.children) {
                    item.children.map(function (subItem) {
                        if(subItem.moduleUrl === action.payload.pathname){
                            state.selectedTitle = subItem.moduleName;
                            checkable = true;
                            return;
                        }
                    });
                }
            })
            if(!checkable){
                location.href = baseUrl;
            }
        }

    }
    if (action.type === ActionTypes.DASHBOARD_FRAMEWORK_LEFTMENU_SUCCESS) {
        state.data = action.response
        state.requestCondition = action['requestCondition'];
        if (!state.selectedUrl) {
            state.selectedUrl = window.location.pathname;
        }
        state.data.responseData.data.content = state.data.responseData.data.content.map(function (item) {
            item.moduleUrl = item.moduleUrl ? baseUrl + item.moduleUrl : item.moduleUrl;
            if (state.selectedUrl == item.moduleUrl) {
                state.selectedTitle = item.moduleName;
            }
            if (item.children) {
                item.children = item.children.map(function (subItem) {
                    subItem.moduleUrl = baseUrl + subItem.moduleUrl;
                    if (state.selectedUrl == subItem.moduleUrl) {
                        state.openParent = item.internalId;
                        state.selectedTitle = subItem.moduleName;

                    }
                    return subItem
                });
            }
            return item
        })
        return l_merge({}, state)
    }
    if (action.type === ActionTypes.DASHBOARD_FRAMEWORK_LEFTMENU_COLLAPSE_CHANGE) {
        let collapse = false
        if (state.collapse !== undefined) {
            collapse = !state.collapse
        }
        return l_merge({}, state, {collapse: action.requestCondition.collapse})
    }
    if (action.type === ActionTypes.DASHBOARD_FRAMEWORK_LEFTMENU_SELECT_CHANGE) {
        return l_merge({}, state, {
            selectedUrl: action.requestCondition.selectedUrl,
            selectedTitle: action.requestCondition.selectedTitle
        })
    }
    return state;
}

export default Redux.combineReducers({leftMenuData})