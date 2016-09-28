import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import DevTools from '../containers/DevTools'

function ConfigureStore() {
};
ConfigureStore.prototype = {
    configureStore: function configureStore({preloadedState, reducer, middleware}) {
        const store = Redux.createStore(
            reducer,
            preloadedState,
            Redux.compose(
                Redux.applyMiddleware(thunk,...middleware, createLogger()),
                DevTools.instrument()
            )
        )

        // if (module.hot) {
        //     // Enable Webpack hot module replacement for reducers
        //     module.hot.accept('../reducers', () => {
        //         const nextRootReducer = require('../reducers').default
        //         store.replaceReducer(nextRootReducer)
        //     })
        // }

        return store
    }
}

module.exports = new ConfigureStore();
