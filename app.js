const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const io = require("socket.io");
// const port=5000;
app.set('port', process.env.PORT || 3000)
app.use(express.static(path.join(__dirname, 'public')));

let server = http.createServer(app).listen(app.get('port'),function(){
    console.log(`Server running on port 3000`)
})



io = require('socket.io').listen(server);

// handle socket traffic
io.socket.on('connection', function (socket) {
    socket.on('nick', function (nick) {
        socket.nickname = nick
    })

    // reply chat data to client 
    socket.on('chat', function (data) {
        let nickname = socket.nickname
        let payload = {
            message: data.message,
            nick: nickname
        };

        socket.emit('chat', payload);
        socket.broadcast.emit('chat', payload);

    })
})


