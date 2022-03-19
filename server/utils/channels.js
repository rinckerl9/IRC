var {getUsersInRoom} = require('./users');
var rooms = [];
var roomID = 0;

var addRoom = function(name) {
    var existingRoom = rooms.find(function(room) {
        return room.name === name;
    });
    if (existingRoom) {
        return {
            error: 'Room name is already taken.'
        };
    }
    name = name.trim().toLowerCase();
    roomID = roomID + 1;
    var room = {
        id: roomID,
        name: name
    };
    rooms.push(room);
    return {
        room: room
    };
}

var removeRoom = function(name, io=null, socket=null) {
    name = name.trim().toLowerCase();
    var index = rooms.findIndex(function(room) {
        return room.name === name;
    });
    if (index !== -1) {
        if (io && socket) {
            return rooms.splice(index, 1)[0];
        }
        return null;
    }
}

var roomListContains = function(filter) {
    return rooms.filter(function(room) {
        return room.name.includes(filter);
    });
}

module.exports = { addRoom, removeRoom, roomListContains, rooms };
