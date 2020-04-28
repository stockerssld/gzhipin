import React from 'react'
import PropTypes from 'prop-types'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile'

const {Header,Body} = Card
function UserList(props){
    const {userList}= props
    return(
        <WingBlank style={{marginBottom:50, marginTop:50}}>
           
                {
                    userList.map(user=>(
                        <div key={user._id}>
                            <WhiteSpace/>
                            <Card>
                                <Header 
                                    thumb={require(`./../../assets/Images/${user.header}.png`)}
                                    extra={user.username}/>
                                <Body>
                                    <div>Post: {user.post}</div>
                                    {user.company? <div>Empresa: {user.company}</div>:null}
                                    {user.salary? <div>Salario: {user.salary}</div>:null}                                    
                                    <div>información: {user.info}</div>
                                </Body>
                            </Card>
                        </div>
                    ))
                }
        </WingBlank>
    )
}

UserList.prototype={
    userList: PropTypes.array.isRequeired
}

export default UserList