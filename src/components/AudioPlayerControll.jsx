import React, { Component } from 'react';
import './AudioPlayerControll.css';

import { connect } from 'react-redux';

class AudioPlayerControll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playPauseIcon: "M0 0h6v24H0zM12 0h6v24h-6z",
        };

        this.onPlayPauseClick = this.onPlayPauseClick.bind(this);

    }


    onPlayPauseClick() {
        console.log("Play/Pause btn Clicked")
        console.log(this.props.playerSC)
        if (this.props.playerSC != null) {
            if (this.props.playerSC.isPlaying()) {
                this.setState({
                    playPauseIcon: "M18 12L0 24V0",
                })
                this.props.playerSC.pause();
            } else {
                this.setState({
                    playPauseIcon: "M0 0h6v24H0zM12 0h6v24h-6z",
                })
                this.props.playerSC.play();
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
                    <span className="current-time">-:--</span>
                    <div className="slider" data-direction="horizontal">
                        <div className="progress" style={{ width: '0%' }}>
                            <div className="pin" id="progress-pin" data-method="rewind"></div>
                        </div>
                    </div>
                    <span className="total-time">-:--</span>
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