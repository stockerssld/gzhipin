import React, {useState} from 'react'

import {connect} from 'react-redux'
import { NavBar, List, InputItem } from 'antd-mobile'
import {sendMsg} from './../../redux/Actions'

const {Item} =List

let initialState={
    content:'s'
}

function Chat(props){
    const [state, setState] = useState(initialState)
    const handleSend =()=>{
        const from = props.user._id
        const to = props.match.params.userid
        const content = state.content.trim()

        if(connect){
            props.sendMsg({from, to, content})
        }
        setState({content: ''})

    }
    const {user}=props
    const {users, chatMsgs} = props.chat

    const meID = user._id
    if(!users[meID]){
        return null
    }
    const targetID= props.match.params.userid
    const chatId = [meID, targetID].sort().join('_')

    const msgs = chatMsgs.filter(msg=>msg.chat_id===chatId)

    const targetHeader = users[targetID].header
    const targerIcon = targetHeader ? require(`./../../assets/Images/${targetHeader}.png`):null

    return(
        <>
            <div id='chat-page'>
                <NavBar> {} </NavBar>
                <List>
                    {
                        msgs.map(msg=>{
                            if(targetID===msg.from){
                                return(
                                    <Item 
                                        key={msg._id}
                                        thumb={targerIcon}>
                                        {msg.content}
                                    </Item>
                                )
                            }else{
                                return(
                                    <Item key={msg._id} className="chat-me"
                                    extra="aloja">
                                        {msg.content}
                                    </Item>
                                )
                            }     
                        })
                    }
                </List>

                <div className='am-tab-bar'>
                    <InputItem
                        onChange={val=> setState({content: val})}
                        value={state.content}
                        placeholder= 'Escriba un mensaje'
                        extra={
                            <span onClick={handleSend}>Enviar</span>
                        }
                    />
                </div>
            </div>
        </>
    )
}
export default connect(
    state=>({user: state.user, chat: state.chat}),
    {sendMsg}
)(Chat)