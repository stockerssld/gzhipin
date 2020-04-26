/*
    Login
*/
import React, {useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'
import LoabanInfo from './../loaban-info'
import DashenInfo from '../dashen-info'
import {getRedirectTo} from './../../utils'
import {getUser} from './../../redux/Actions'

function Main(props){
    useEffect(() => {
        const userid = Cookies.get('userid')
        const {_id}= props.user
        if(userid && !_id){
            // conssole.log(userid,'=> id de usuario')
            props.getUser()
            // console.log(props.getUser())
        }

        // return () => {
        //     // cleanup
        // }
    }, [])
    const userid = Cookies.get('userid')

    if(!userid){
        return <Redirect to='/login'/>
    }
    
    const {user} = props
    
    // debugger

    if(!user._id){
        return null
    } else{
        let path = props.location.pathname
        if(path==='/'){
            path = getRedirectTo(user.type, user.header)
            return <Redirect to={path}/>
        }
    }

    return(
        <Switch>
            <Route path="/laobanInfo" component={LoabanInfo} />
            <Route path='/dashenInfo' component={DashenInfo}/>
        </Switch>
    )
}
 
export default connect(
    state=>({user: state.user}),
    {getUser}
)(Main)

