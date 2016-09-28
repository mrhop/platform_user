import DevTools from '../common/containers/DevTools'

import login from './reducers/login'
import LoginInternal from './containers/LoginInternal'

const store = ConfigureStore.configureStore({reducer: login, middleware: [MiddleWare.defaultCall]});
ReactDOM.render(
    <ReactIntl.IntlProvider locale={locale} messages={UtilFun.getIntl('auth')}>
        <ReactRedux.Provider store={store}>
            <LoginInternal />
        </ReactRedux.Provider>
    </ReactIntl.IntlProvider>,
document.querySelector('.auth-main')
);

