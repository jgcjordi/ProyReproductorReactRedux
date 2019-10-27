import React, { Component } from 'react';

import CardSong from '../components/CardSong';
import Player from '../components/Player';
import AudioPlayerControll from '../components/AudioPlayerControll';


import SC from 'soundcloud';

import ImageDiscDefault from '../images/discDefault.jpg';
import ImagePlayer from '../images/reproductor.jpg';

import { connect } from 'react-redux';
import { newSearchText, newArraySongs, newImagePlayer, newPlayerSC } from '../actions/mediaPlayer';




class MediaPlayer extends Component {
    constructor(props) {
        super(props);

        SC.initialize({
            client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb'
        });

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.onSearcherTextChanged = this.onSearcherTextChanged.bind(this);
        this.onDragOverAtPlayer = this.onDragOverAtPlayer.bind(this);
        this.onDropAtPlayer = this.onDropAtPlayer.bind(this);
    }

    //Listeners

    onBtnSearchClicked() {
        this.getArraySongs()
    }

    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.getArraySongs()
        }
    }

    onSearcherTextChanged(event) {
        this.props.newSearchText(event.target.value)
    }

    onDragStart(ev) {
        ev.dataTransfer.setData("idSong", ev.target.id);
        ev.dataTransfer.setData("srcSong", ev.target.title);
    }

    onDragOverAtPlayer(ev) {
        ev.preventDefault();
    }

    onDropAtPlayer(ev) {
        ev.preventDefault();
        let id = ev.dataTransfer.getData("idSong");
        let src = ev.dataTransfer.getData("srcSong");
        SC.stream('/tracks/' + id)
            .then((player) => {
                player.play()
                console.log(player)
                this.props.newPlayerSC(player)
            });
        this.props.newImagePlayer(src)
    }


    /////////SHORTEN FUNCTIONS//////////////


    getArraySongs() {
        SC.get('/tracks', {
            q: this.props.searchText
        })
            .then((res) => {
                this.props.newArraySongs(res)
                this.props.newSearchText("")
            })
    }

    ifNullImageDisc(song) {
        let image
        if (song.artwork_url != null) {
            image = song.artwork_url
        } else {
            image = ImageDiscDefault
        }
        return image
    }

    ifEmptyImagePlayer() {
        let image = this.props.imagePlayer
        if (image === "") {
            image = ImagePlayer
        }
        return image
    }

    onPlay(){

    }


    ////////////RENDER///////////////

    render() {

        return (
            <div className="searcherAndMedia">
                <h1>Reproductor con React y Redux con API SoundCloud</h1>

                <div className="searcher">
                    <button className="searchButton" onClick={() => this.onBtnSearchClicked()}>Buscar</button>
                    <input
                        className="seacherTextImput"
                        type="text"
                        placeholder="Busca la cancion..."
                        onChange={(ev) => this.onSearcherTextChanged(ev)}
                        onKeyDown={this.handleKeyDown}
                        value={this.props.searchText}
                    />
                </div>

                <div className="media">

                    <AudioPlayerControll/>

                    <Player
                        onDragOver={(ev) => this.onDragOverAtPlayer(ev)}
                        onDrop={(ev) => this.onDropAtPlayer(ev)}
                        imagePlayer={this.ifEmptyImagePlayer()} />

                    <div className="cardsSong">
                        {this.props.arraySongs.map(song =>
                            <CardSong
                                key={song.id}
                                id={song.id}
                                title={song.title}
                                src={this.ifNullImageDisc(song)}
                                onDragStart={this.onDragStart}
                            />)}
                    </div>
                </div>

                {/* <pre>
                    {console.log(this.props.playerSC)}
                </pre> */}

                {/* <pre>
                    {JSON.stringify(this.props.arraySongs, null,4)}
                </pre> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    searchText: state.mediaPlayer.searchText,
    imagePlayer: state.mediaPlayer.imagePlayer,
    arraySongs: state.mediaPlayer.arraySongs,
    playerSC: state.mediaPlayer.playerSC
})

const mapDispatchToProps = dispatch => ({
    newSearchText: (searchText) => dispatch(newSearchText(searchText)),
    newImagePlayer: (imagePlayer) => dispatch(newImagePlayer(imagePlayer)),
    newArraySongs: (arraySongs) => dispatch(newArraySongs(arraySongs)),
    newPlayerSC: (playerSC) => dispatch(newPlayerSC(playerSC))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MediaPlayer);