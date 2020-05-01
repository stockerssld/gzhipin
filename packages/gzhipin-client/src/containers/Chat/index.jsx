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

    return(
        <>
            <div id='chat-page'>
                <NavBar> {} </NavBar>
                <List>
                    {/* <Item thumb={require(``)}>

                    </Item> */}
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
    state=>({user: state.user}),
    {sendMsg}
)(Chat)