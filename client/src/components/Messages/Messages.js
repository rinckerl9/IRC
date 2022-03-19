import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';
import './Messages.css';

var Messages = ({ messages, name }) => (
    <ScrollToBottom className="msg">
        {messages.map((message, iterator) => <div key={iterator}><Message message={message} name={name} /></div>)}
    </ScrollToBottom>
);

export default Messages;
