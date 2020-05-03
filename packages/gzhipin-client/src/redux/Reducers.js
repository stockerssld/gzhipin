/* 

    Reducer: state, action, state
*/
import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG, RECEIVE_MSG_LIST, MSG_READ} from './Action-types'
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
    chatMsgs: [],
    unReadCount: 0,
}
function chat(state=initChat, action) {
    switch (action.type) {
      case RECEIVE_MSG_LIST:  // data: {users, chatMsgs}
        const {users, chatMsgs, userid} = action.data
        return {
          users,
          chatMsgs,
          unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal+(!msg.read&&msg.to===userid?1:0),0)
        }
      case RECEIVE_MSG: // data: chatMsg
        const {chatMsg} = action.data
        return {
          users: state.users,
          chatMsgs: [...state.chatMsgs, chatMsg],
          unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
        }
      case MSG_READ:
        const {from, to, count} = action.data
        state.chatMsgs.forEach(msg => {
          if(msg.from===from && msg.to===to && !msg.read) {
            msg.read = true
          }
        })
        return {
          users: state.users,
          chatMsgs: state.chatMsgs.map(msg => {
            if(msg.from===from && msg.to===to && !msg.read) { // 需要更新
              
              return {...msg, read: true}
            } else {// 不需要
              // console.log(msg)

              return msg
            }
          }),
          unReadCount: state.unReadCount-count
        }
      default:
        return state
    }
  }
  


export default combineReducers({
    user, userList, chat
})
//{ user: {} }
