import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Login.css';

export default function Login() {
    var [name, setName] = useState('');
    var [room, setRoom] = useState('');
    return (
        <div className="voidContainer">
            <div className="loginContainer">
                <h1 className="heading">Login Page</h1>
                <div>
                    <h2>Username:</h2>
                    <input className="login" type="text" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <h2>Channel:</h2>
                    <input className="login" type="text" onChange={(event) => setRoom(event.target.value)} />
                </div>
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className={'button'} type="submit">Login</button>
                </Link>
            </div>
        </div>
    );
}