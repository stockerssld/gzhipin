import React from 'react'
import PropTypes from 'prop-types'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

const {Header,Body} = Card

function UserList(props){
    const {userList}= props
    
    return(
        <WingBlank style={{marginBottom:50, marginTop:50}}>
            <QueueAnim type='left' delay={100}>
                {
                    userList.map(user=>(
                        <div key={user._id}>
                            <WhiteSpace/>
                            <Card onClick={()=> props.history.push(`/chat/${user._id}`)}>
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
            </QueueAnim>
        </WingBlank>
    )
}

UserList.prototype={
    userList: PropTypes.array.isRequeired
}

export default withRouter(UserList)