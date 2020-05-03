import React, {useState, useEffect} from 'react'
// 62._>5:41
import {connect} from 'react-redux'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import {sendMsg, readMsg} from './../../redux/Actions'
// import QueueAnim from 'rc-queue-anim'

const {Item} =List

let initialState={
    content:'',
    isShow: false,
}

let emojis=[]
function Chat(props){
    const [state, setState] = useState(initialState)
    
//  useEffect(()=>{
//     window.scrollTo(0, document.body.scrollHeight)
//  },[window.scrollTo])

//  useEffect(()=>{
//     const from =props.match.params.userid
//     const to = props.user._id
//     props.readMsg(from, to)
//  },[props.user._id])


    useEffect(() => {
        emojis= ['😀','😁','😆','😅','🤣','🤔',
        '🙂','🙃', '😇','🥰','😍','😘','🙂','🙃', '😇',
                '🤩']
        emojis = emojis.map(emoji=>({text: emoji}))
        
    }, [])
   
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight)

      
    })  

    useEffect(()=>{
        return()=>{
            readmsg()
        }
    })
    function readmsg(){
        const from = props.match.params.userid
        const to = props.user._id
       
        props.readMsg(from, to)
    }
    
    const toggleShow= ()=>{
        const isShow = !state.isShow
        setState({...state,
            isShow
        })
        if(isShow){
            setTimeout(()=>{
                window.dispatchEvent(new Event('resize'))
            },0)
        }
    }
    
    const handleSend =()=>{
        const from = props.user._id
        const to = props.match.params.userid
        const content = state.content.trim()

        if(content){
            props.sendMsg({from, to, content})
        }
        setState({
            ...state,
            content: '',
            isShow: false
        })
       
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
                <NavBar 
                    icon={<Icon type='left' />}
                    className="sticky-header"
                    onLeftClick={()=>props.history.goBack()}
                > 
                    {users[targetID].username} </NavBar>
                <List style={{marginTop: 50, marginBottom: 50}}>
                    {/* <QueueAnim type='left' delay={100}> */}
                        {
                            msgs.map(msg=>{
                                if(targetID===msg.from){
                                    return(
                                        <Item 
                                            key={msg._id}
                                            thumb={targerIcon}
                                        >
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
                    {/* </QueueAnim> */}
                </List>

                <div className='am-tab-bar'>
                    <InputItem
                        onChange={val=> setState({content: val})}
                        onFocus={()=>setState({...state, isShow: false})}
                        value={state.content}
                        placeholder= 'Escriba un mensaje'
                        extra={
                            <span>
                                <span onClick={toggleShow} style={{marginRight:5}}>😀</span>
                                <span onClick={handleSend}>Enviar</span>
                            </span>
                        }
                    />
                    {state.isShow ? (
                        <Grid
                        data={emojis}
                        columnNum={8}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={(item)=>{
                            setState({...state,content: state.content + item.text})
                        }}
                        />
                    ) : null}
                    
                </div>
            </div>
        </>
    )
}
export default connect(
    state=>({user: state.user, chat: state.chat}),
    {sendMsg,readMsg}
)(Chat)