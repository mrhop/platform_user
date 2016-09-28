export const INIT_CLIENT_REQUEST = 'INIT_CLIENT_REQUEST'
export const INIT_CLIENT_SUCCESS = 'INIT_CLIENT_SUCCESS'
export const INIT_CLIENT_FAILURE = 'INIT_CLIENT_FAILURE'


function initClientLogin(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'get',
            types: [INIT_CLIENT_REQUEST, INIT_CLIENT_SUCCESS, INIT_CLIENT_FAILURE],
            //endpoint: `/oauth2client/byclient`,
            endpoint:requestCondition.endpoint,
        }
    }
}

export function initClientLoginDispatch(requestCondition) {
    return (dispatch, getState) => {
        return dispatch(initClientLogin(requestCondition))
    }
}