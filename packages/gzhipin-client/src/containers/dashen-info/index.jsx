import React from 'react'
import {connect} from 'react-redux'
import  {NavBar, InputItem, Button, TextareaItem} from 'antd-mobile'
import { HeaderSelector } from '../../components/Logo/header-selector'

function DashenInfo(){
    return(
        <>
        <NavBar>Empleos Directors</NavBar>
        <HeaderSelector/>
        <InputItem>Busqueda por posición de empleo</InputItem>
        <TextareaItem title="Introducción personal: "
            placeholder="Introdusca una introducción personal"
            rows={3} />
        <Button type='primary'>Guardar</Button>

        </>
    )
}

export default connect(
    state=>({}),
    {}
)(DashenInfo)
