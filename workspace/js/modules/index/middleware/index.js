//export  {default as dashBoard }  from './dashBoard'
// for prepare to the default call, special parameters
import dashBoard from './dashBoard'
import table from './table'

export default [].concat(dashBoard,table, MiddleWare.defaultCall);