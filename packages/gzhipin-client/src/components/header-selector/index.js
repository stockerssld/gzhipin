import React,{useState,useEffect} from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

const initialState={
    icon:null
}

export function HeaderSelector(props){
    const [state, setstate] = useState(initialState)
    var headerList=[]
    // useEffect(()=>{
        for (let i = 0; i < 20; i++) {
            //     
            headerList.push({
                text:"imagen"+`${i+1}`,
                icon:require(`./../../assets/Images/imagen${i+1}.png`)
            })       
        }
    // },[])
    const handleClick =({text, icon})=>{
        setstate({icon})
        props.setHeader(text)
    }
    const {icon} = state
    const listHeader= !state.icon?'Seleccione un Avatar' : (<div> Imagen seleccionada: <img src={icon}/> </div>)
// console.log(headerList,"headerList,")
    return(
        <List renderHeader={()=> listHeader}> 
            <Grid data={headerList}
                columnNum={5}
                onClick={handleClick}
                >

            </Grid>
        </List>
    )
}



HeaderSelector.propTypes={
    setHeader: PropTypes.func.isRequired
}