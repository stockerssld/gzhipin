import React,{useState,useEffect} from 'react'
import {List,Grid} from 'antd-mobile'

export function HeaderSelector(props){
    
    const [state,setState]=useState([])
    var headerList=[]
    useEffect(()=>{
        for (let i = 0; i < 20; i++) {
            // setState(...state, headerList: )     
            headerList.push({
                text:"imagen "+`${i+1}`,
                icon:require(`./Images/imagen${i+1}.png`)
            })       
        }
    },[])
    const listHeader= 'Seleccione un Avatar'

    return(
        <List renderHeader={()=> listHeader}> 
            <Grid data={headerList}
                columnNum={5}
                >

            </Grid>
        </List>
    )
}