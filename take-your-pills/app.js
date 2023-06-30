const express = require('express')
const http = require('http')

const PORT = 3000

const app = express()
const server = http.Server(app)
const path = require('path')

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html')
})

app.use('/client', express.static(path.join(__dirname, 'client')))


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

var SOCKET_LIST = {}
var connectionOptions = {forceNew: false, reconnection: false, autoConnect: false}
var io = require('socket.io')(server, connectionOptions);
io.sockets.on('connect', function (socket) {
    socket.id = Math.random()
    SOCKET_LIST[socket.id] = socket

    socket.on('disconnect', function () {
        delete SOCKET_LIST[socket.id]
    })
})

setInterval(function () {
    var pack = {
    }

    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i]
        socket.emit("newPositions", pack)
    }
}, 1000/15)