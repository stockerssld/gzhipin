/*
    Login
*/
import React, {useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'

import {getRedirectTo} from './../../utils'
import {getUser} from './../../redux/Actions'

import DashenInfo from '../dashen-info'
import Dashen from './../dashen/index'
import Laoban from './../laoban/index'
import LoabanInfo from './../loaban-info'
import Messages from '../Messages'
import Personal from '../Personal'
import NotFound from '../../components/Not-Found/Index'
import { NavBar } from 'antd-mobile'
import NavFooter from '../../components/Nav-Footer'
import Chat from '../Chat'

const navList=[
    {
        path: '/laoban',
        component: Laoban,
        title: 'Gran lista de Dios',
        icon: 'dashen',
        text:'Gran Dios',
    },
    {
        path: '/dashen',
        component: Dashen,
        title: 'Lista de Jefes',
        icon: 'laoban',
        text: 'Jefe'
    },
    {
        path: '/message',
        component: Messages,
        title: 'Lista de Mensajes',
        icon: 'message',
        text: 'mensaje'
    },
    {
        path: '/personal',
        component: Personal,
        title: 'Centro de usuarios',
        icon: 'personal',
        text: 'Personal'
    }
]
function Main({user,getUser, location, unReadCount}){

    useEffect(() => {
        const userid = Cookies.get('userid')
        const {_id}= user
        if(userid && !_id)
            getUser()
    }, [getUser,user])

    const userid = Cookies.get('userid')

    if(!userid){
        return <Redirect to='/login'/>
    }
    
    
    // debugger

    if(!user._id){
        return null
    } else{
        let path = location.pathname
        if(path==='/'){
            path = getRedirectTo(user.type, user.header)
            return <Redirect to={path}/>
        }
    }

    const path=location.pathname
    const currentNav=navList.find(nav=> nav.path===path)

    if(currentNav){
        if(user.type==='laoban'){
            navList[1].hide = true
        }else{
            navList[0].hide = true
        }
    }
    // console.log(unReadCount)

    return(
        <>
        {currentNav? <NavBar className="sticky-header">{currentNav.title}</NavBar>:null}
        <Switch>
            {navList.map(nav=> <Route key={nav.path} path={nav.path} component={nav.component}/>)}
            <Route path="/laobanInfo" component={LoabanInfo} />
            <Route path='/dashenInfo' component={DashenInfo}/>
            <Route path='/Chat/:userid' component={Chat}/>
            <Route component={NotFound}/>
        </Switch>
        {currentNav? <NavFooter navList={navList} unReadCount={unReadCount}/>:null}
        </>
    )
}

const stateToProps = state=>{
    // console.log(state)
    return{
        user: state.user, unReadCount: state.chat.unReadCount
    }
}
 
export default connect(
    stateToProps,
    {getUser}
)(Main)

