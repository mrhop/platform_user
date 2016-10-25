import dashBoardFramework from '../../include/dashBoard/reducers'
import table from '../../common/table/reducers'
import chart from '../../common/responsiveCharts/reducers'
import form from '../../common/form/reducers'
import dragDrop from '../../common/dragDrop/reducers'
const routing = ReactRouterRedux.routerReducer;
const rootReducer = Redux.combineReducers({
    dashBoardFramework,
    table,
    chart,
    form,
    dragDrop,
    routing
})
export default rootReducer;