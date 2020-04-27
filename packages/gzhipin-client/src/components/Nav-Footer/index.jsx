import React from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter,useLocation } from 'react-router-dom'
const Item = TabBar.Item



function NavFooter(props){
    const {navList}= props
    const {pathname}=useLocation()
    // console.log(Location)
    // const path = props.history.location.pathname
    return(
        <TabBar>
            {
                navList.map((nav, index)=>{
                console.log(nav)
                    return    <Item key={nav.path} 
                        title={nav.text}
                        icon={{uri: require(`./images/${nav.icon}.png`)}}
                        selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                        selected={pathname===nav.path}
                        onPress={()=>props.history.replace(nav.path)}
                    ></Item>
                })
            }
        </TabBar>
    )
}
NavFooter.prototype={
    navList: PropTypes.array.isRequired
}

export default withRouter(NavFooter)