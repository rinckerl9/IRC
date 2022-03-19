var express = require('express');
var http = require('http');
var cors = require('cors');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var dotenv = require('dotenv');

dotenv.config();

var indexRouter = require('./routes/index');
// var db = require('./database/connect');

var PORT = process.env.PORT || 8080;

var app = express();
var server = http.createServer(app);
var io = socketio(server, {
    cors: {
        origin: 'http://localhost:8081',
        methods: 'GET, POST, PUT, DELETE, OPTIONS',
        allowedHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With',
        credentials: false
    }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(indexRouter);

var { addUser, removeUser, getUser, getUsersInRoom, editUser } = require('./utils/users');
var { addRoom } = require('./utils/channels');
var { cmdCreate, cmdDelete, cmdList, cmdMsg, cmdNick, cmdQuit, cmdUsers } = require('./utils/commands');

io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        addRoom(room);
        var { error, user } = addUser({ id: socket.id, name, room });
        if (error) {
            return callback(error);
        }
        socket.join(user.room);
        socket.emit('message', {user: 'admin', text: `${user.name}, Welcome to channel ${user.room}!`});
        io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined the channel.`});
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        callback();
    });
    socket.on('sendMessage', (message, callback) => {
        var user = getUser(socket.id);
        if (message.indexOf('/') === 0) {
            var args = message.substring(1).split(' ');
            try {
                switch (args[0]) {
                    case 'create':
                        cmdCreate(user, io, args, socket);
                        break;
                    case 'delete':
                        cmdDelete(user, io, args, socket);
                        break;
                    case 'list':
                        cmdList(user, io, args, socket);
                        break;
                    case 'msg':
                        cmdMsg(user, io, args, socket);
                        break;
                    case 'nick':
                        cmdNick(user, io, args, socket);
                        break;
                    case 'quit':
                        cmdQuit(user, io, args, socket);
                        break;
                    case 'users':
                        cmdUsers(user, io, args, socket);
                        break;
                    default:
                        io.to(user.id).emit('message', {user: user.name, text: "Bad command."});
                        break;
                }
            } catch (error) {
                console.log("Catch :" + error)
            }
        } else {
            try {
                io.to(user.room).emit('message', {user: user.name, text: message});
            } catch (error) {
                console.log("Catch :" + error)
            }
        }
        callback();
    });
    socket.on('disconnect', () => {
        var user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left the channel.`});
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        }
    })
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
