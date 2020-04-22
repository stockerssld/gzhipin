/*
    Registro
*/
import React,{useState} from 'react'
import { 
    NavBar, 
    WingBlank, 
    List, 
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import './../../assets/css/index.less'


import {register} from './../../redux/Actions'

import Logo from '../../components/Logo'

const ListItem= List.Item


const initialvalue={
    username:'',
    password:'',
    password2:'',
    type:''
}



function Register(props){
    const [state, setState]=useState(initialvalue)

    function register(e){
        e.preventDefault()
        console.log(state)
        props.register(state)

    }
    
    function handleChange(name, value){
        // const {name, value}= e.target
        // console.log('asd ',name,value,'asdafd')
        setState({...state, [name]: value}) // values, usename, password, confirmpassword, type
    }

    const toLogin=()=>{
        props.history.replace('/login')
    }

    const {type}=state
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
                    {msg?<div className="error-msg">{msg}</div>:null}
                    <WhiteSpace/>
                    <InputItem placeholder="StockersSLD" value={state.username} onChange={val=>{handleChange('username', val)}}>Nombre</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" placeholder="******"  value={state.password} onChange={val=>{handleChange('password', val)}}> Contraseña: </InputItem>
                    <WhiteSpace/>
                    <InputItem type="password"  placeholder="******" value={state.password2} onChange={val=>{handleChange('password2', val)}}> Confirmar contraseña: </InputItem>
                    <WhiteSpace/>
                    <ListItem>
                        <span>Tipo de usuario</span>
                        <Radio checked={type==='laoban'} onChange={()=>handleChange('type','laoban')}>Laoban</Radio>
                        <Radio checked={type==='dashen'} onChange={()=>handleChange('type','dashen')}>Dashen</Radio>
                    </ListItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={register}>Crear Cuenta</Button>
                    <WhiteSpace/>
                    <Button onClick={toLogin}>Ya tengo una cuenta</Button>
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

export default connect( stateToProps, {register})(Register)
