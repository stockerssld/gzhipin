/*
    Iniciar Sesión
*/
import React from 'react'
import { 
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import { useState } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from './../../redux/Actions' 
import Logo from '../../components/Logo'

const ListItem=List.Item

const initialValue={
    usename:'',
    password:   ''
}

function Login(props){
    const [state, setState]=useState(initialValue)

    const iniciarSesion=()=>{
        console.log(state)
        props.login(state)
    }

    const handleChange=(name,value)=>{
        setState({...state, [name]: value})
    }
    const {type}= state
    const toRegister=()=>{
        props.history.replace('/register')
    }

    const {msg, redirectTo}=props.user

    if(redirectTo){
        return <Redirect to={redirectTo}/>
    }
    return(
        <>
            <NavBar>
                Empleos Directos
            </NavBar>
            <Logo/>
            <WingBlank>
                <List>
                    {msg ? <div className="error-msg">{msg}</div>:null}
                    <WhiteSpace/>
                    <InputItem placeholder="StockersSLD" value={state.username} onChange={val=>{handleChange('username', val)}}>Nombre</InputItem>
                    <InputItem type="password" placeholder="******"  value={state.password} onChange={val=>{handleChange('password', val)}}> Contraseña: </InputItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={iniciarSesion}>Iniciar Sesión</Button>
                    <WhiteSpace/>
                    <Button onClick={toRegister}>No tengo cuenta</Button>

                </List>
            </WingBlank>
        </>
    )
}
const stateToProps = state=>{
    console.log(state)
    return{
        user: state.user
    }
}


export default connect(stateToProps,{login})(Login)