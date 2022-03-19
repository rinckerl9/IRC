import React, {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';
import queryString from 'query-string';
import io from "socket.io-client";
import Infos from '../Infos/Infos';
import Messages from '../Messages/Messages';
import SendMsg from '../SendMsg/SendMsg';
import './Irc.css';

var ENDPOINT = 'http://localhost:8080/';
var socket;

var Irc = () => {
    var [message, setMessage] = useState('');
    var [messages, setMessages] = useState([]);
    var [name, setName] = useState('');
    var [users, setUsers] = useState('');
    var [room, setchannel] = useState('');
    var location = useLocation();

    useEffect(() => {
        var { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setchannel(room);
        setName(name)
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [location.search]);
    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });
        socket.on("channelData", ({ users }) => {
            setUsers(users);
        });
    }, []);
    var sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    return (
        <div className="around">
            <div className="container">
                <Infos room={room} />
                <Messages messages={messages} name={name} />
                <SendMsg message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>

        </div>
    );
}

export default Irc;
