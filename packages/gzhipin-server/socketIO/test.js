module.exports = function(server){
    const io = require('socket.io')(server)
    io.on('connection', function(socket){
        console.log(' SocketIO Conectado')
        socket.on('sendMsg',  function(data){
            console.log("Servidor", data)
            io.emit('receiveMsg', data.name + '_' + data.date)
            console.log('Servidor', data)
        })
    })
}