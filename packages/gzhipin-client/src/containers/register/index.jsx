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
import Logo from '../../components/Logo'

const ListItem= List.Item
const RadioItem = Radio.RadioItem

const initialvalue={
    username:'joSE',
    password:'123456789',
    password2:'123456789',
    type:''
}
export default function Register(props){
    
   
    const [state, setState]=useState(initialvalue)
    
    // console.log(state)
    
    const register =()=>{
        console.log(state)
    }
    function handleChange(name, value){
        value.preventDefault()
        // const {name, value}= e.target
        // console.log('asd ',name,value,'asdafd')
        setState({...state, [name]: value}) // values, usename, password, confirmpassword, type
    }

    const {type}=state
    
    const toLogin=()=>{
        props.history.replace('/login')
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
                    <WhiteSpace/>
                    <InputItem type="password" placeholder="******"  value={state.password} onChange={val=>{handleChange('password', val)}}> Contraseña: </InputItem>
                    <WhiteSpace/>
                    <InputItem type="password"  placeholder="******" value={state.password2} onChange={val=>{handleChange('password2', val)}}> Confirmar contraseña: </InputItem>
                    <WhiteSpace/>
                    <ListItem>
                        <span>Tipo de usuario</span>
                        <Radio checked={type==='Hombre'} onChange={()=>handleChange('type','Hombre')}>Hombre</Radio>
                        <Radio checked={type==='Mujer'} onChange={()=>handleChange('type','Mujer')}>Mujer</Radio>
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

