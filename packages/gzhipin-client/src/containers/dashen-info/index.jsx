import React, { useState } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import  {NavBar, InputItem, Button, TextareaItem} from 'antd-mobile'
import { HeaderSelector } from '../../components/Logo/header-selector'
import {updateUser} from './../../redux/Actions'

const initialState={
    header:'',
    post:'',
    company:''
}
function DashenInfo(props){
    const [state, setstate] = useState(initialState)
    console.log(state,"state")

    const setHeader= header=>{
        setstate({...state,header})
    }
    const handleChange=(name, value)=>{
        setstate({...state, [name]:value})
    }

    const save=e=>{
        // console.log(state)
        props.updateUser(state)
    }
    const {header, type}= props.user

    if(header){
        const path = type ==='dashen'?'/dashen': 'laoban'
        return <Redirect to={path}/>
    }

    return(
        <>
        <NavBar>Empleos Directors</NavBar>
        <HeaderSelector setHeader={setHeader}/>
        <InputItem labelNumber="20" onChange={val=>handleChange('post',val)}>Posición de empleo: </InputItem>
        <InputItem labelNumber="20" onChange={val=>handleChange('company', val)}>Introducción personal: </InputItem>
        <Button type='primary' onClick={save}>Guardar</Button>

        </>
    )
}

export default connect(
    state=>({user: state.user}),
    {updateUser}
)(DashenInfo)
