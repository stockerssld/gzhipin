/* 

    Reducer: state, action, state
*/
import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG, RECEIVE_MSG_LIST} from './Action-types'
import {getRedirectTo} from './../utils/index'


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
            const {type,header}=action.data
            return  {...state, ...action.data, redirectTo: getRedirectTo(type,header)}
        case ERROR_MSG: //imformacion del msg
            return {...state, msg: action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return  {...initUser, msg: action.data}
        default:
            return state
    }
}

const initUserList =[]
function userList(state=initUserList, action){
    switch(action.type){
        case  RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}

const initChat={
    users:{},
    chatMsg: [],
    unReadCount: 0,
}

function chat(state=initChat, action){
    switch(action.type){
        case RECEIVE_MSG_LIST:
            const {users, chatMsgs} = action.data
            return{
                users,
                chatMsgs,
                unReadCount: 0
            }
        case RECEIVE_MSG:
            return
        default:
            return state
    }
}


export default combineReducers({
    user, userList, chat
})
//{ user: {} }
