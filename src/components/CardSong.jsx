import React from 'react';

function CardSong(props) {
    return (
        <div className="CardSong" id={`${props.id}`} onDragStart={props.onDragStart} draggable>
            <img className="playerImg" id={`${props.id}`}  src={props.src} alt="discImage">
            </img>
            <span>{props.title}</span>
        </div>
    );
}

export default CardSong;



// import React from 'react';

// function CardSong(props) {
//     return (
//         <div className="CardSong" id={`${props.id}`} onDragStart={props.onDragStart} draggable>
//             <img className="playerImg" id={`${props.id}`}  src={props.src} alt="discImage">
//             </img>
//             <span>{props.title}</span>
//         </div>
//     );
// }

// export default CardSong;