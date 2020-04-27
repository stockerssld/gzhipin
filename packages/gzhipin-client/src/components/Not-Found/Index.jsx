import React from 'react'
import {Button} from 'antd-mobile'

export default function NotFound(props){
    return(
        <>
        <div>
            <div>
                <h2>Está página no est disponible.</h2>
                <Button type="primary" onClick={()=>props.history.replace("/")}>Ir a la pagina principal</Button>
            </div>
        </div>
        </>
    )
}