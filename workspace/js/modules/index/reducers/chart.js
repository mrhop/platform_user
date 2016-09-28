import * as ActionTypes from '../actions/chart'

function demoLineChartData(state = {}, action) {
    if (action.type === ActionTypes.LINE_DEMO_CHART_SUCCESS) {
        state.data = action.response
        state.requestCondition = action['requestCondition'];
        return l_merge({}, state)
    }
    return state  
}

function demoAreaChartData(state = {}, action) {
    if (action.type === ActionTypes.AREA_DEMO_CHART_SUCCESS) {
        state.data = action.response
        state.requestCondition = action['requestCondition'];
        return l_merge({}, state)
    }
    return state
}

function demoBarChartData(state = {}, action) {
    if (action.type === ActionTypes.BAR_DEMO_CHART_SUCCESS) {
        state.data = action.response
        state.requestCondition = action['requestCondition'];
        return l_merge({}, state)
    }
    return state
}

function demoPieChartData(state = {}, action) {
    if (action.type === ActionTypes.PIE_DEMO_CHART_SUCCESS) {
        state.data = action.response
        state.requestCondition = action['requestCondition'];
        return l_merge({}, state)
    }
    return state
}

function demoScatterChartData(state = {}, action) {
    if (action.type === ActionTypes.SCATTER_DEMO_CHART_SUCCESS) {
        state.data = action.response
        state.requestCondition = action['requestCondition'];
        return l_merge({}, state)
    }
    return state
}

function demoTreemapChartData(state = {}, action) {
    if (action.type === ActionTypes.TREEMAP_DEMO_CHART_SUCCESS) {
        state.data = action.response
        state.requestCondition = action['requestCondition'];
        return l_merge({}, state)
    }
    return state
}

export default Redux.combineReducers({demoLineChartData,demoAreaChartData,demoBarChartData,demoPieChartData,demoScatterChartData,demoTreemapChartData})