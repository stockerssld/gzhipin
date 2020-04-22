import React from 'react'
import {connect} from 'react-redux'
import  {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import { HeaderSelector } from '../../components/Logo/header-selector'


function  LoabanInfo(){
    return(
        <>
        <NavBar>Empleos Directors</NavBar>
        <HeaderSelector/>
        <InputItem labelNumber="20" placeholder="Escriba el nombre del puesto que desea"> Posición de Trabajo: </InputItem>
        <InputItem labelNumber="20" placeholder="Escriba el nombre de su empresa">Nombre de la empresa: </InputItem>
        <InputItem labelNumber="8">Salario: </InputItem>
        <TextareaItem title="Requisitos de trabajo: " labelNumber="20"
            placeholder="Introdusca una presentacion personal" rows={3} />
        <Button type="primary">Guardar</Button>
        </>
    )
}

export default connect(
    state=>({}),
    {}
)(LoabanInfo)
