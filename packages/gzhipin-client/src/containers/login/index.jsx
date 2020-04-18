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

import Logo from '../../components/Logo'

const ListItem=List.Item

const initialValue={
    usename:'',
    password:   ''
}

export default function Login(props){
    const [state, setState]=useState(initialValue)

    const iniciarSesion=()=>{
        console.log(state)
    }

    const handleChange=(name,value)=>{
        
        setState({...state, [name]: value})
    }
    const {type}= state
    const toRegister=()=>{
        props.history.replace('/register')
    }

    return(
        <>
            <NavBar>
                Empleos Directos
            </NavBar>
            <Logo/>
            <WingBlank>
                <List>
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

