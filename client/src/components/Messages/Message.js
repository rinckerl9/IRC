import React from 'react';

var Message = ({ message: { text, user }, name }) => {
    let isSentByCurrentUser = false;
    var sanitizedName = name.trim().toLowerCase();
    if (user === sanitizedName) {
        isSentByCurrentUser = true;
    }
    return (isSentByCurrentUser ? (
            <div className="messageContainer justifyEnd sender_self">
                <p className="sentText pr-10"><span id="sender_name">{sanitizedName}</span> : {(text)}</p>
            </div>
        ) : (
            <div className="messageContainer justifyStart">
                <p className="sentText pr-10"><span id="sender_name">{user}</span> : {(text)}</p>
            </div>
        )
    );
}

export default Message;
