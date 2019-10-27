import React from 'react';
import './CardSong.css';


function CardSong(props) {
    return (
        <div className="CardSong" id={`${props.id}`} title={props.src} onDragStart={props.onDragStart} draggable>
            <img className="cardSongImg" id={`${props.id}`}  src={props.src} alt="discImage">
            </img>
            <div className="cardTitle">{props.title}</div>
        </div>
    );
}

export default CardSong;