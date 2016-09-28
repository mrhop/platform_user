import thunk from 'redux-thunk'

function ConfigureStore() {
};
ConfigureStore.prototype = {
    configureStore: function configureStore({preloadedState, reducer, middleware}) {
        return Redux.createStore(
            reducer,
            preloadedState,
            Redux.applyMiddleware(thunk, ...middleware)
        )
    }
}

module.exports = new ConfigureStore();