export const CHART_REQUEST = 'CHART_REQUEST'
export const CHART_SUCCESS = 'CHART_SUCCESS'
export const CHART_FAILURE = 'CHART_FAILURE'


function getChart(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'get',
            types: [CHART_REQUEST, CHART_SUCCESS, CHART_FAILURE],
            endpoint: requestCondition.endpoint,
        },
        requestCondition
    }
}
export function getChartDispatch(requestCondition = {
    filters: null,
}) {
    return (dispatch, getState) => {
        return dispatch(getChart(requestCondition))
    }
}
