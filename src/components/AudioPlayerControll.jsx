import React, { Component } from 'react';
import './AudioPlayerControll.css';

import { connect } from 'react-redux';

class AudioPlayerControll extends Component {


    constructor(props) {
        super(props);


        this.state = {
            playPauseIcon: "M18 12L0 24V0",
            totalTime: "-:--",
            currentTime: "-:--",
            progressPrecentaje: "0%",
            startSong: true,
            player: props.playerSC
        };

        this.onPlayPauseClick = this.onPlayPauseClick.bind(this);
    }

    ////////////LIFE CICLE///////////////

    static getDerivedStateFromProps(props, state){
        if (props.playerSC !== state.player) {
            console.log("Eureca")
            state.startSong = true
            state.playPauseIcon = "M0 0h6v24H0zM12 0h6v24h-6z"
          }
        return null
    }

    componentDidUpdate() {
        if (this.props.playerSC != null && this.state.startSong) {
            this.startProgressControll()
            this.onFinish()
            this.setState({
                startSong: false,
                player: this.props.playerSC,
            })
        }
        return null
    }

    ////////////SHORTEN FUNCTIONS///////////////


    startProgressControll() {
        this.props.playerSC.on("time",() => {

            let totalTime = this.formatTime(this.props.playerSC.getDuration());
            let currentTime = this.formatTime(this.props.playerSC.currentTime());

            let songPercentajeNumber = this.songPercentaje(
                this.props.playerSC.getDuration(),
                this.props.playerSC.currentTime()
            );

            let percentaje = songPercentajeNumber + '%'

            this.setState({
                totalTime: totalTime,
                currentTime: currentTime,
                progressPrecentaje: percentaje,
            })
        })
    }

    formatTime(time) {
        if (time != null) {
            let timeNumber = parseInt(time, 10)
            let secAux = timeNumber / 1000;
            let minAux = secAux / 60
            let min = Math.floor(minAux);
            let sec = Math.floor(secAux % 60);
            return min + ':' + (sec < 10 ? '0' + sec : sec);
        }
    }

    songPercentaje(duration, currentTime) {
        if (duration != null && currentTime != null) {
            let dur = parseInt(duration, 10)
            let current = parseInt(currentTime, 10)
            return current / dur * 100;
        }
    }


    ////////////////LISTENERS//////////////////////

    onFinish() {
        this.props.playerSC.on("finish", () => {
            this.setState({
                playPauseIcon: "M18 12L0 24V0",
            })
        })
    }


    onPlayPauseClick() {
        if (this.props.playerSC != null) {
            if (this.props.playerSC.isPlaying()) {
                this.props.playerSC.pause();
                this.setState({
                    playPauseIcon: "M18 12L0 24V0",
                })
            } else {
                if (!this.props.playerSC.isPlaying()) {
                    this.props.playerSC.play();
                    this.setState({
                        playPauseIcon: "M0 0h6v24H0zM12 0h6v24h-6z",
                    })
                }
            }
        }
    }

    ////////////RENDER///////////////

    render() {

        return (
            <div className="audio green-audio-player">
                <div className="play-pause-btn" onClick={this.onPlayPauseClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24">
                        <path className="play-pause-icon" id="playPause" fill="#566574" fillRule="evenodd" d={this.state.playPauseIcon} ></path>
                    </svg>
                </div>

                <div className="controls">
                    <span className="current-time">{this.state.currentTime}</span>
                    <div className="slider" data-direction="horizontal">
                        <div className="progress" style={{ width: `${this.state.progressPrecentaje}` }}>
                            <div className="pin" id="progress-pin" data-method="rewind"></div>
                        </div>
                    </div>
                    <span className="total-time">{this.state.totalTime}</span>
                </div>

            </div>
        );
    }
}


const mapStateToProps = state => ({
    playerSC: state.mediaPlayer.playerSC,
})

export default connect(
    mapStateToProps
)(AudioPlayerControll);