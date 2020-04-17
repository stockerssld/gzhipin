import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'

import store from './redux/Store'
import Register from './containers/register'
import Login from './containers/login'
import Main from './containers/main'
function Router(){
    return(
        <Provider store={store}>
            <HashRouter>
                <Switch>
                <Route path='/Register' component={Register}/>
                <Route path='/Login' component={Login}/>
                <Route component={Main}/>
                </Switch>
            </HashRouter>
        </Provider>
    )   
}
ReactDOM.render(<Router/>, document.getElementById('root'))