export const LINE_DEMO_CHART_REQUEST = 'LINE_DEMO_CHART_REQUEST'
export const LINE_DEMO_CHART_SUCCESS = 'LINE_DEMO_CHART_SUCCESS'
export const LINE_DEMO_CHART_FAILURE = 'LINE_DEMO_CHART_FAILURE'

export const AREA_DEMO_CHART_REQUEST = 'AREA_DEMO_CHART_REQUEST'
export const AREA_DEMO_CHART_SUCCESS = 'AREA_DEMO_CHART_SUCCESS'
export const AREA_DEMO_CHART_FAILURE = 'AREA_DEMO_CHART_FAILURE'

export const BAR_DEMO_CHART_REQUEST = 'BAR_DEMO_CHART_REQUEST'
export const BAR_DEMO_CHART_SUCCESS = 'BAR_DEMO_CHART_SUCCESS'
export const BAR_DEMO_CHART_FAILURE = 'BAR_DEMO_CHART_FAILURE'

export const PIE_DEMO_CHART_REQUEST = 'PIE_DEMO_CHART_REQUEST'
export const PIE_DEMO_CHART_SUCCESS = 'PIE_DEMO_CHART_SUCCESS'
export const PIE_DEMO_CHART_FAILURE = 'PIE_DEMO_CHART_FAILURE'

export const SCATTER_DEMO_CHART_REQUEST = 'SCATTER_DEMO_CHART_REQUEST'
export const SCATTER_DEMO_CHART_SUCCESS = 'SCATTER_DEMO_CHART_SUCCESS'
export const SCATTER_DEMO_CHART_FAILURE = 'SCATTER_DEMO_CHART_FAILURE'

export const TREEMAP_DEMO_CHART_REQUEST = 'TREEMAP_DEMO_CHART_REQUEST'
export const TREEMAP_DEMO_CHART_SUCCESS = 'TREEMAP_DEMO_CHART_SUCCESS'
export const TREEMAP_DEMO_CHART_FAILURE = 'TREEMAP_DEMO_CHART_FAILURE'

function getDemoLineChart(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'get',
            types: [LINE_DEMO_CHART_REQUEST, LINE_DEMO_CHART_SUCCESS, LINE_DEMO_CHART_FAILURE],
            endpoint: `demoData/chartData/line.json`,
        },
        requestCondition
    }
}
export function getDemoLineChartDispatch(requestCondition = {
    filters: null,
}) {
    return (dispatch, getState) => {
        return dispatch(getDemoLineChart(requestCondition))
    }
}

function getDemoAreaChart(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'get',
            types: [AREA_DEMO_CHART_REQUEST, AREA_DEMO_CHART_SUCCESS, AREA_DEMO_CHART_FAILURE],
            endpoint: `demoData/chartData/area.json`,
        },
        requestCondition
    }
}
export function getDemoAreaChartDispatch(requestCondition = {
    filters: null,
}) {
    return (dispatch, getState) => {
        return dispatch(getDemoAreaChart(requestCondition))
    }
}


function getDemoBarChart(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'get',
            types: [BAR_DEMO_CHART_REQUEST, BAR_DEMO_CHART_SUCCESS, BAR_DEMO_CHART_FAILURE],
            endpoint: `demoData/chartData/bar.json`,
        },
        requestCondition
    }
}
export function getDemoBarChartDispatch(requestCondition = {
    filters: null,
}) {
    return (dispatch, getState) => {
        return dispatch(getDemoBarChart(requestCondition))
    }
}


function getDemoPieChart(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'get',
            types: [PIE_DEMO_CHART_REQUEST, PIE_DEMO_CHART_SUCCESS, SCATTER_DEMO_CHART_FAILURE],
            endpoint: `demoData/chartData/pie.json`,
        },
        requestCondition
    }
}
export function getDemoPieChartDispatch(requestCondition = {
    filters: null,
}) {
    return (dispatch, getState) => {
        return dispatch(getDemoPieChart(requestCondition))
    }
}


function getDemoScatterChart(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'get',
            types: [SCATTER_DEMO_CHART_REQUEST, SCATTER_DEMO_CHART_SUCCESS, SCATTER_DEMO_CHART_FAILURE],
            endpoint: `demoData/chartData/scatter.json`,
        },
        requestCondition
    }
}
export function getDemoScatterChartDispatch(requestCondition = {
    filters: null,
}) {
    return (dispatch, getState) => {
        return dispatch(getDemoScatterChart(requestCondition))
    }
}


function getDemoTreemapChart(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'get',
            types: [TREEMAP_DEMO_CHART_REQUEST, TREEMAP_DEMO_CHART_SUCCESS, TREEMAP_DEMO_CHART_FAILURE],
            endpoint: `demoData/chartData/treemap.json`,
        },
        requestCondition
    }
}
export function getDemoTreemapChartDispatch(requestCondition = {
    filters: null,
}) {
    return (dispatch, getState) => {
        return dispatch(getDemoTreemapChart(requestCondition))
    }
}