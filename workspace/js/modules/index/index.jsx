/**
 * Created by Donghui Huo on 2016/5/11.
 */
import rootReducer from './reducers'
import routes from './routes'
import middleware from './middleware'


const store = ConfigureStore.configureStore({reducer: rootReducer, middleware: middleware});
const history = ReactRouterRedux.syncHistoryWithStore(ReactRouter.browserHistory, store)

if (window.localStorage && window.localStorage["common_properties" + (baseUrl ? '::' + baseUrl : '')]) {
    global.commonProperties = JSON.parse(window.localStorage["common_properties" + (baseUrl ? '::' + baseUrl : '')])
}

ReactDOM.render(
    <RootContainer store={store} history={history} routes={routes}/>,
    document.querySelector('#entirety')
)