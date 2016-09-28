export default store=>
    next => action => {
        //now do nothing,just to the next layer
        return next(action)
    }