import React from 'react';
import './Infos.css';

var Infos = ({ room }) => (
    <div className="infos">
        <div className="left">
            <h3>{room}</h3>
        </div>
        <div className="right">
            <a id="button" href="/"><p>Disconnect from IRC</p></a>
        </div>
    </div>
);

export default Infos;
