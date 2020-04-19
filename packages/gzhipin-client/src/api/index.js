import React from 'react'
import Ajax from './ajax'

//Crear nuevo usuario
export const reqRegister = (user) => Ajax('/register', user, 'POST')
//Iniciar Sesión
export const reqLogin = ({username, password}) =>Ajax('/login', {username, password}, 'POST') 
//Actualizar usuario
export const reqUpdateUser = (user) => Ajax('/update', user, 'POST')