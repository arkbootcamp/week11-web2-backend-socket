const express = require('express')
const {Server} = require('socket.io')

const app = express()
const http = require('http')
const httpServer = http.createServer(app)
const PORT = 4000
// app.use(cors())
// app.use('/v1', route)
const io = new Server(httpServer, {
    cors:{
        origin: 'http://localhost:3000'
    }
})

io.on('connection', (socket)=>{
    console.log(`ada perankat yg terhubung dengan id ${socket.id}`);

    socket.on('inisialRoom', ({room, username})=>{
        console.log(room);
        socket.join(`room:${room}`)
        // socket.broadcast.t
        socket.broadcast.to(`room:${room}`).emit('notifAdmin', {
            sender: 'Admin',
            message: `${username} bergabung dalam group`,
            date: new Date().getHours()+':'+ new Date().getMinutes()
        })
    })

    socket.on('sendMessage', ({room, sender, message})=>{
        console.log('roomSender', room);
        io.to(`room:${room}`).emit('newMessage', {
            sender: sender,
            message: message,
            date: new Date().getHours()+':'+ new Date().getMinutes()
        })
    })

    // socket.on('message', ({idSocket, message})=>{
    //     // socket.emit('messageBE', {message: data, date: new Date()})
    //     // socket.broadcast.emit('messageBE', {message: data, date: new Date()})
    //     // io.emit('messageBE', {message: data, date: new Date()})
    //     socket.to(idSocket).emit('messageBE', {message: message, date: new Date()})
    // })
    socket.on('disconnect', ()=>{
        console.log(`ada perangkat yg terputus dengan id ${socket.id}`);
        // userModel.deleteUserbyId()
    })
})

httpServer.listen(PORT, ()=>{
    console.log(`server is running in port ${PORT}`);
})