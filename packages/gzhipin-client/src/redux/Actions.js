/* 
    Action Creator 
    Action
    Action
*/
import {reqRegister,reqLogin, reqUpdateUser, reqUser} from './../api'
import {AUTH_SUCCESS,ERROR_MSG, RECEIVE_USER, RESET_USER} from './Action-types'

const authSucces=(user)=>({
    type: AUTH_SUCCESS,
    data:user
})
const errorMsg=(msg)=>({
    type: ERROR_MSG,
    data: msg
})

const receiveUser=(user)=>({
    type: RECEIVE_USER, 
    data: user
})

const resetUser=(msg)=>({
    type: RESET_USER, 
    data: msg
})

// Action
export const register=(user)=>{
    const {username, password, password2, type}=user
    if(!username && !password&& !password2 && !type){
        return errorMsg('No se han llenado todo los campos')   
    }
    else if(!username){
        return errorMsg('Ya existe este usuario')
    } else if(password!==password2){
        return errorMsg('La contraseñas no coinciden')
    }
    
    return async dispatch=>{
        // const response = areqRegister(user)
        // promise.then(response=>{
        //     const result = response.data // {code 0/1, data: user, msg:'}
        // })
        const response = await reqRegister({username, password, type})
        const result = response.data // {code 0/1, data: user, msg:'}
        if(result.code===0){
            dispatch(authSucces(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}

export const login=(user)=>{
    const {username, password}=user
    
    if(!username && !password){
        return(errorMsg('No existe este usuario'))
    } else if( !username || !password){
        return(errorMsg('Credenciales invalidades'))
    }
    
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

export const updateUser = (user)=>{
    return async distpatch=>{
        const response= await reqUpdateUser(user)
        const result = response.data
        if(result.code===0){
            distpatch(receiveUser(result.data))
        }else{
            distpatch(resetUser(result.msg))
        }
    }
}

export const getUser = () =>{
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if(result.code===0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }  
    }
}