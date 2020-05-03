import io from 'socket.io-client'

//Conecta al servidor para obtener el objeto de conexion con el servidor
const socket = io('ws://192.168.8.182:3001')

//Enviar mensaje
socket.emit('sendMsg',{name: 'abc'})

console.log('El cliente envia un mensaje al servidor', {name: 'abc'})
socket.on('receiveMsg', function(data){
    console.log('El cliente recive el mensaje enviado por el servidor',data)
})