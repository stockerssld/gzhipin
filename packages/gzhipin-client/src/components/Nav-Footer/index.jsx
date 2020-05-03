import React from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter,useLocation } from 'react-router-dom'

const Item = TabBar.Item

function NavFooter(props){
    let {navList, unReadCount}= props
    const {pathname}=useLocation()

    navList= navList.filter(nav=> !nav.hide)
    
    return(
        <TabBar>
            {
                navList.map((nav)=>(
                        <Item key={nav.path} 
                        badge={nav.path==='/message'? unReadCount:0}
                        title={nav.text}
                        icon={{uri: require(`./images/${nav.icon}.png`)}}
                        selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                        selected={pathname===nav.path}
                        onPress={()=>props.history.replace(nav.path)}
                    ></Item>
                ))
            }
        </TabBar>
    )
}
NavFooter.prototype={
    navList: PropTypes.array.isRequired,
    unReadCount: PropTypes.number.isRequired
}

export default withRouter(NavFooter)