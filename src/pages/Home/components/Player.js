import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
}) => {
  const getTime = (time) => {
    let minute = Math.floor(time / 60);
    let second = ("0" + Math.floor(time % 60)).slice(-2);
    return `${minute}:${second}`;
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      //set state 停止 並且會re render
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const togglePlayPauseIcon = () => {
    if (isPlaying) {
      return faPause;
    } else {
      return faPlay;
    }
  };

  return (
    <PlayerContainer>
      <TimeControlContainer>
        {/* player左邊的時間 抓當前更新的時間 */}
        <P>{getTime(songInfo.currentTime || 0)}</P>
        {/* 中間的進度條 */}
        <Track currentSong={currentSong}>
          <Input
            onChange={dragHandler}
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
          />
          <AnimateTrack songInfo={songInfo}></AnimateTrack>
        </Track>
        {/*player左邊總時間 */}
        <P>{getTime(songInfo.duration || 0)}</P>
      </TimeControlContainer>

      {/*底下的撥放鍵 */}
      <PlayerContainer>
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={togglePlayPauseIcon()}
          size="2x"
          style={pointer}
        />
      </PlayerContainer>
    </PlayerContainer>
  );
};

// style
const pointer = { cursor: "pointer" };

const PlayerContainer = styled.div`
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const TimeControlContainer = styled.div`
  margin-top: 5vh;
  width: 50%;
  display: flex;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const Track = styled.div`
  background: lightblue;
  width: 100%;
  height: 1rem;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  background: linear-gradient(
    to right,
    ${(p) => p.currentSong.color[0]},
    ${(p) => p.currentSong.color[1]}
  );
`;

const AnimateTrack = styled.div`
  background: rgb(204, 204, 204);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(
    ${(p) =>
      Math.round((p.songInfo.currentTime * 100) / p.songInfo.duration) + "%"}
  );
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;
  /* padding-top: 1rem;
	padding-bottom: 1rem; */
  &:focus {
    outline: none;
    -webkit-appearance: none;
  }
  @media screen and (max-width: 768px) {
    &::-webkit-slider-thumb {
      height: 48px;
      width: 48px;
    }
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    background: transparent;
    border: none;
  }
  &::-moz-range-thumb {
    -webkit-appearance: none;
    background: transparent;
    border: none;
  }
  &::-ms-thumb {
    -webkit-appearance: none;
    background: transparent;
    border: none;
  }
  &::-moz-range-thumb {
    -webkit-appearance: none;
    background: transparent;
    border: none;
  }
`;

const P = styled.p`
  padding: 0 1rem 0 1rem;
  user-select: none;
`;

export default Player;
