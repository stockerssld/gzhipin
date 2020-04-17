/*
    Registro
*/
import React from 'react'
import { 
    NavBar, 
    WingBlank, 
    List, 
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import Logo from '../../components/Logo'

const ListItem= List.Item
const RadioItem = Radio.RadioItem
export default function Register(){
    return(
        <div>
            <NavBar>
                Empleos Directos
            </NavBar>
            <Logo/>
            <WingBlank>
                <List>
                    <WhiteSpace/>
                    <InputItem placeholder="StockersSLD">Nombre</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" placeholder="******"> Contraseña: </InputItem>
                    <WhiteSpace/>
                    <InputItem type="password"  placeholder="******"> Confirmar contraseña: </InputItem>
                    <WhiteSpace/>
                    <ListItem>
                        <span>Tipo de usuario</span>
                        <Radio>
                            
                        </Radio>
                    </ListItem>
                    <WhiteSpace/>
                    <Button type="primary">Crear Cuenta</Button>
                    <WhiteSpace/>
                    <Button>Ya tengo una cuenta</Button>
                </List>
            </WingBlank>
        </div>
    )
}

