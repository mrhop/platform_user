import * as ActionTypes from '../actions/login'
import form from '../../common/form/reducers'

function client(state = {}, action) {
    if (action.type === ActionTypes.INIT_CLIENT_SUCCESS) {
        if (action.response.status && action.response.status === "success") {
            state = {clientValidated: true,commonProperties:action.response.responseData}
            //此处写入cookie
            return l_merge({}, state)
        }
        else {
            console.log(action.response.status + " : " + action.response.message)
        }
    }
    return state
}


export default Redux.combineReducers({client, form})