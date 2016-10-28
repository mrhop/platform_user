export const DASHBOARD_FRAMEWORK_LEFTMENU_REQUEST = 'DASHBOARD_FRAMEWORK_LEFTMENU_REQUEST'
export const DASHBOARD_FRAMEWORK_LEFTMENU_SUCCESS = 'DASHBOARD_FRAMEWORK_LEFTMENU_SUCCESS'
export const DASHBOARD_FRAMEWORK_LEFTMENU_FAILURE = 'DASHBOARD_FRAMEWORK_LEFTMENU_FAILURE'
export const DASHBOARD_FRAMEWORK_LEFTMENU_COLLAPSE_CHANGE = 'DASHBOARD_FRAMEWORK_LEFTMENU_COLLAPSE_CHANGE'
export const DASHBOARD_FRAMEWORK_LEFTMENU_SELECT_CHANGE = 'DASHBOARD_FRAMEWORK_LEFTMENU_SELECT_CHANGE'


// /index  &&/ demoTable  action
function getLeftMenu(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'get',
            types: [DASHBOARD_FRAMEWORK_LEFTMENU_REQUEST, DASHBOARD_FRAMEWORK_LEFTMENU_SUCCESS, DASHBOARD_FRAMEWORK_LEFTMENU_FAILURE],
            endpoint: endpoints.dashboardleftmenu,
        },
        requestCondition
    }
}
export function getLeftMenuDispatch(requestCondition) {
    return (dispatch, getState) => {
        return dispatch(getLeftMenu(requestCondition))
    }
}

export function leftMenuCollapseChange(requestCondition) {
    return (dispatch, getState) => {
        return dispatch({requestCondition, type: DASHBOARD_FRAMEWORK_LEFTMENU_COLLAPSE_CHANGE});
    }
}


export function leftMenuSelectedChange(requestCondition) {
    return (dispatch, getState) => {
        return dispatch({requestCondition, type: DASHBOARD_FRAMEWORK_LEFTMENU_SELECT_CHANGE});
    }
}


