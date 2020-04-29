module.exports = function(server){
    const io = require('socket.io')(server)

    io.on('connection', function(socket){
        console.log('Hay un cliente conectado al servidor.')

        socket.on('sendMsg', function(data){
            console.log('El servidor recibio el mensaje enviado por el cliente.')
            data.name = data.name.toUpperCase()
            socket.emit('receiveMsg', data)
            console.log('El servidor envia un mensaje al cliente')
        })
    })
}