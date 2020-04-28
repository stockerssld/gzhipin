import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {getUserList} from './../../redux/Actions'

import UserList from './../../components/User-List/index'

function Dashen({getUserList,userList}){

    useEffect(() => {
        getUserList('laoban')
    },[getUserList])

    return(
        <>
            <UserList userList={userList}/>
        </>
    )
}

export default connect(
    state=>({ userList: state.userList}),
    {getUserList}
)(Dashen)