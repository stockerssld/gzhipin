/* 
curso 29
    Reducer: state, action, state
*/
import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERROR_MSG} from './Action-types'
let initUser={
    username:'',
    type:'',
    msg:'',
    redirectTo:''
}

// Estado del usuario
function user(state=initUser, action){
    switch(action.type){
        case AUTH_SUCCESS: //datos de usuario
            return  {...state, ...action.data, redirectTo: '/'}
        case ERROR_MSG: //imformacion del msg
            return {...state, msg: action.data}
        default:
            return state
    }
}


export default combineReducers({
    user
})
//{ user: {} }