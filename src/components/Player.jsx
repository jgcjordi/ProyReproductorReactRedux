import React from 'react';
import './Player.css';


function Player(props) {

    return (
        <div className="Player" onDrop={props.onDrop} onDragOver={props.onDragOver}>
            <img className="playerImg"
                src={props.imagePlayer}
                alt="palyerImage">
            </img>
        </div>
    );

}

export default Player;