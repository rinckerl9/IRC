var users = [];

var addUser = function({ id, name, room }) {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    if (name === '' || room === '') {
        return {
            error: 'Username and room are required.'
        };
    }
    var existingUser = users.find(function(user) {
        return user.room === room && user.name === name;
    });
    if (existingUser) {
        return {
            error: 'Username is already taken.'
        };
    }
    var user = {
        id: id,
        name: name,
        room: room
    };
    users.push(user);
    return {
        user: user
    };
}

var removeUser = function(id) {
    var index = users.findIndex(function(user) {
        return user.id === id;
    });
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

var editUser = function(id, name, room) {
    var user = getUser(id);
    if (user) {
        removeUser(id);
    }
    var newUser = {id: id, name: name, room: room};
    addUser(id, name, room);
    return newUser;
}

var getUser = function(id) {
    return users.find(function(user) {
        return user.id === id;
    });
}

var getUsersInRoom = function(room) {
    room = room.trim().toLowerCase();
    return users.filter(function(user) {
        return user.room === room;
    });
}

module.exports = { addUser, removeUser, editUser, getUser, getUsersInRoom };
