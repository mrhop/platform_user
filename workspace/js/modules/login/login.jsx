import DevTools from '../common/containers/DevTools'

import login from './reducers/login'
import LoginInternal from './containers/LoginInternal'

const store = ConfigureStore.configureStore({reducer: login, middleware: [MiddleWare.defaultCall]});
ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <LoginInternal />
    </ReactRedux.Provider>,
    document.querySelector('.auth-main')
);

