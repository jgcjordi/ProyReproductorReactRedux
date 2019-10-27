import React from 'react';
import './CardSong.css';


function CardSong(props) {
    return (
        <div className="CardSong" id={`${props.id}`} title={props.src} onDragStart={props.onDragStart} draggable>
            <img className="cardSongImg" id={`${props.id}`}  src={props.src} alt="discImage">
            </img>
            <span>{props.title}</span>
        </div>
    );
}

export default CardSong;