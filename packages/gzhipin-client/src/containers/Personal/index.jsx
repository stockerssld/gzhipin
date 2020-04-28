import React from 'react'
import {connect} from 'react-redux'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
import {resetUser} from './../../redux/Actions'
import Cookies from 'js-cookie'
const Item = List.Item
const Brief = Item.Brief

function Personal(props){

    const  logout = () => {
        Modal.alert('Salir', '¿Estás seguro de cerrar la sesión?', [
          {text: 'No'},
          {
            text: 'Si',
            onPress: ()=> {
              Cookies.remove('userid')
              props.resetUser()
            }
          }
        ])
      }
    const {username, header, company,salary, post, info } = props.user
    return(
        <div style={{marginBottom:50, marginTop:50}}>
            <Result 
                    img={<img src={require(`./../../assets/Images/${header}.png`)} style={{width: 50}} alt="header"/>}
                    title={username}
                    message={company}
                />
                <List renderHeader={()=> '相关信息'}>
                    <Item multipleLine>
                    <Brief>Puesto: {post}</Brief>
                    <Brief>Conocimientos:{info}</Brief>
                    {salary?<Brief>Salario: {salary}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace/>
                {/* <List> */}
                    <Button type="warning" onClick={logout}>Cerrar sesión</Button>
                {/* </List> */}
        </div>
    )
}
const stateToProps=state=>{
    // console.log(state)
    return{
        user: state.user
    }
}

export default connect(
    stateToProps,
    {resetUser}
)
(Personal)