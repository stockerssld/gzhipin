import React, {useState} from 'react'
import {connect} from 'react-redux'
import  {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import { HeaderSelector } from '../../components/Logo/header-selector'

const initialState={
    header:'',
    post:'',    
    info:'',
    company:'',
    salary:''
}

function  LoabanInfo(){
    const [state, setstate] = useState(initialState)
    console.log(state,"state")

    // header
    const setHeader=(header)=>{
        setstate({...state,header})
    }


    const handleChange=(name, value)=>{
        setstate({...state, [name]: value})
    }
    
    const save=(e)=>{
        console.log(state)
    }
    return(
        <>
        <NavBar>Empleos Directors</NavBar>
        <HeaderSelector setHeader={setHeader}/>
        <InputItem  labelNumber="20" placeholder="Escriba el nombre del puesto que desea"
                    onChange={val=>{handleChange('post', val)}}> Posición de Trabajo: </InputItem>

        <InputItem labelNumber="20" placeholder="Escriba el nombre de su empresa"
                    onChange={val=>{handleChange('company', val)}}>Nombre de la empresa: </InputItem>

        <InputItem labelNumber="8" onChange={val=>{handleChange('salary', val)}}>Salario: </InputItem>

        <TextareaItem title="Requisitos de trabajo: " labelNumber="20"
            placeholder="Introdusca una presentacion personal" rows={3}
            onChange={val=>{handleChange('info', val)}} />
        
        <Button type="primary" onClick={save}> Guardar</Button>
        </>
    )
}


export default connect(
    state=>({}),
    {}
)(LoabanInfo)
