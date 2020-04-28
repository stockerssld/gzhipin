import io from 'socket.io-client'

const socket = io('ws://localhost:3001')

socket.on('receiveMsg', function(data){
    console.log('Usuario conectado', data)
})

socket.emit('sendMsg', {name: 'Tom', date: Date.now()})
console.log('Cliente console.log()=>,', {name: 'Tom', date: Date.now()})