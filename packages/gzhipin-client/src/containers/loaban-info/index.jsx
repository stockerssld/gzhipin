import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import  {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import { HeaderSelector } from '../../components/header-selector'
import {updateUser} from './../../redux/Actions'
const initialState={
    header:'',
    post:'',    
    info:'',
    company:'',
    salary:''
}

function  LoabanInfo(props){
    const [state, setstate] = useState(initialState)

    // header
    const setHeader=(header)=>{
        setstate({...state,header})
    }


    const handleChange=(name, value)=>{
        setstate({...state, [name]: value})
    }
    
    const save=(e)=>{
        console.log(state)

        props.updateUser(state)
    }

    const { header, type } = props.user
    if(header){
        const path = type === 'dashen' ? '/dashen':'/laoban'
        return <Redirect to={path}/>
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
    state=>({user: state.user}),
    {updateUser}
)(LoabanInfo)
