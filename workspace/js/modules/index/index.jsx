/**
 * Created by Donghui Huo on 2016/5/11.
 */
import rootReducer from './reducers'
import routes from './routes'
import middleware from './middleware'

export const store = ConfigureStore.configureStore({reducer: rootReducer, middleware: middleware});
const history = ReactRouterRedux.syncHistoryWithStore(ReactRouter.browserHistory, store)

ReactDOM.render(
    <RootContainer store={store} history={history} routes={routes}/>,
    document.querySelector('#entirety')
)