/* 
    Action Creator 
    Action
    Action
*/
import {reqRegister,reqLogin} from './../api'
import {AUTH_SUCCESS,ERROR_MSG} from './Action-types'

const authSucces=(user)=>({
    type: AUTH_SUCCESS,
    data:user
})
const errorMsg=()=>({
    type: ERROR_MSG, data: msg
})

// Action
export const register=(user)=>{
    return async dispatch=>{
        // const response = areqRegister(user)
        // promise.then(response=>{
        //     const result = response.data // {code 0/1, data: user, msg:'}
        // })
        const response = await areqRegister(user)
        const result = response.data // {code 0/1, data: user, msg:'}
        if(result.code===0){
            dispatch(authSucces(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}

export const login=(user)=>{
    return async dispatch=>{
        // const response = reqLogin(user)
        // promise.then(response=>{
        //     const result = response.data // {code 0/1, data: user, msg:'}
        // })
        const response = await reqLogin(user)
        const result = response.data
        if(result.code===0){
            dispatch(authSucces(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}