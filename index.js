const express = require('express')
const {Server} = require('socket.io')

const app = express()
const http = require('http')
const httpServer = http.createServer(app)
const PORT = 4000
const io = new Server(httpServer, {
    cors:{
        origin: 'http://localhost:3000'
    }
})

io.on('connection', (socket)=>{
    console.log(`ada perankat yg terhubung dengan id ${socket.id}`);
    socket.on('message', (data)=>{
        // socket.emit('messageBE', {message: data, date: new Date()})
        // socket.broadcast.emit('messageBE', {message: data, date: new Date()})
        // io.emit('messageBE', {message: data, date: new Date()})
        socket.broadcast.to('0ffppraFNq1bEKHfAAAF').emit('messageBE', {message: data, date: new Date()})
    })
    socket.on('disconnect', ()=>{
        console.log(`ada perangkat yg terputus dengan id ${socket.id}`);
    })
})

httpServer.listen(PORT, ()=>{
    console.log(`server is running in port ${PORT}`);
})