/*
    Login
*/
import React from 'react'
import {Switch, Route} from 'react-router-dom'

import LoabanInfo from './../loaban-info'
import DashenInfo from '../dashen-info'

export default function Main(){
    return(
        <Switch>
            <Route path="/loabanInfo" component={LoabanInfo} />
            <Route path='/dashenInfo' component={DashenInfo}/>
        </Switch>
    )
}