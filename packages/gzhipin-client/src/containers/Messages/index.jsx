import React from 'react'
import { connect } from 'react-redux'
import {List, Badge} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item
const Brief = Item.Brief

function getLastMsgs(chatMsgs, userid){
    const lastMsgObjs = {}

    chatMsgs.forEach(msg => {

        if(msg.to===userid && !msg.read){
            msg.unReadCount=1
        }else{
            msg.unReadCount=0  
        }
        const chatId = msg.chat_id
        const lastMsg= lastMsgObjs[chatId]

        if(!lastMsg){
            lastMsgObjs[chatId]= msg
        }else{
            const unReadCount = lastMsg.unReadCount + msg.unReadCount

            if(msg.create_time>lastMsg.create_time){
                lastMsgObjs[chatId] = msg
            }
            lastMsgObjs[chatId].unReadCount = unReadCount 

        }
    });

    const lastMsgs = Object.values(lastMsgObjs)
    lastMsgs.sort(function(m1,m2){
        return m2.create_time-m1.create_time
    })
    return lastMsgs
}

function Messages(props){

    const {user}= props
    const {users, chatMsgs}=props.chat

    const lastMsgs=getLastMsgs(chatMsgs, user._id)

    return(
        <List style={{marginTop: 50, marginBottom:50}}>
            <QueueAnim type='left' delay={100}>
                {
                    lastMsgs.map(msg=>{
                        const targetUserId= msg.to===user._id ? msg.from : msg.to
                        const targetUser = users[targetUserId]
                        
                        return(
                        <Item
                        key={msg._id}
                            extra={<Badge text={msg.unReadCount}/>}
                            thumb={targetUser.header?require(`./../../assets/Images/${targetUser.header}.png`):null}
                            arrow='horizontal'
                            onClick={()=> props.history.push(`/chat/${targetUserId}`)}
                        >
                            {msg.content}
                            <Brief>{targetUser.username}</Brief>
                        </Item>
                    )   
                    })
                }
            </QueueAnim>
        </List>
    )
}

export default connect(
    state=>({user: state.user, chat: state.chat}),
    {}
)(Messages)