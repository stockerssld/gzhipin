var path = require('path')
const fs = require('fs')
const express = require('express')
var app = express();
var http = require('http').createServer(app)
// module.exports.io = require('socket.io')(http)

// app.use(express.static())
// const Socket = require('./socket')
// Socket;

http.listen(3001, function (){
    console.log("Listening on *:80")
})