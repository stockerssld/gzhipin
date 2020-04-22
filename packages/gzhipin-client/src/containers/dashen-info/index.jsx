import React, { useState } from 'react'
import {connect} from 'react-redux'
import  {NavBar, InputItem, Button, TextareaItem} from 'antd-mobile'
import { HeaderSelector } from '../../components/Logo/header-selector'

const initialState={
    header:'',
    post:'',
    company:''
}
function DashenInfo(){
    const [state, setstate] = useState(initialState)
    console.log(state,"state")

    const setHeader= header=>{
        setstate({...state,header})
    }
    const handleChange=(name, value)=>{
        setstate({...state, [name]:value})
    }

    const save=e=>{
        console.log(state)
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
    state=>({}),
    {}
)(DashenInfo)
