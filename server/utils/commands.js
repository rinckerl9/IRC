var {addUser, removeUser, getUser, getUsersInRoom, editUser} = require('./users');
var {addRoom, removeRoom, roomListContains, rooms} = require('./channels');

var cmdCreate = function(user, io, args, socket) {
    if (args == null || args.length !== 2) {
        io.to(user.id).emit('message', {user: user.name, text: "Bad argument."});
    } else {
        addRoom(args[1].trim().toLowerCase());
        io.to(user.id).emit('message', {user: user.name, text: "Channel created."});
    }
}

var cmdDelete = function(user, io, args, socket) {
    if (args == null || args.length !== 2) {
        io.to(user.id).emit('message', {user: user.name, text: "Bad argument."});
    } else {
        if (roomListContains(args[0].trim().toLowerCase())) {
            removeRoom(args[1].trim().toLowerCase());
            io.to(user.id).emit('message', {user: user.name, text: "Channel has been deleted."});
        } else {
            io.to(user.id).emit('message', {user: user.name, text: "Channel does not exist."});
        }
    }
}

var cmdList = function(user, io, args, socket) {
    var channels = [];
    for (var i = 0; i < rooms.length; i++) {
        channels.push(rooms[i].name);
    }
    io.to(user.id).emit('message', {user: user.name, text: channels.join(" ")});
}

var cmdMsg = function(user, io, args, socket) {
    if (args == null || args.length < 2) {
        io.to(user.id).emit('message', {user: user.name, text: "Bad argument."});
    } else {
        var msg = "";
        for (var i = 1; i < args.length; i++) {
            msg += args[i] + " ";
        }
        io.to(args[0].trim().toLowerCase()).emit('message', {user: user.name, text: msg});
    }
}

var cmdNick = function(user, io, args, socket) {
    if (args == null || args.length !== 1) {
        io.to(user.id).emit('message', {user: user.name, text: "Bad argument."});
    } else {
        var usr = editUser(user.id, args[0].trim().toLowerCase(), user.room);
        io.to(user.id).emit('message', {user: user.name, text: `Your nickname has been changed to ${usr.name}.`});
    }
}

var cmdQuit = function(user, io, args, socket) {
    if (args == null || args.length !== 1) {
        io.to(user.id).emit('message', {user: user.name, text: "Bad argument."});
    } else {
        socket.leave(user.room);
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
    }
}

var cmdUsers = function(user, io, args, socket) {
    var users = getUsersInRoom(user.room);
    var msg = "";
    for (var i = 0; i < users.length; i++) {
        msg += users[i].name + " ";
    }
    io.to(user.id).emit('message', {user: user.name, text: msg});
}

module.exports = {
    cmdCreate,
    cmdDelete,
    cmdList,
    cmdMsg,
    cmdNick,
    cmdQuit,
    cmdUsers
};
