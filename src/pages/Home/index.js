import React, { useState, useRef } from "react";
import styled from "styled-components";

import Nav from "./components/Nav";
import Song from "./components/Song";
import Player from "./components/Player";

import data from "../data/data";

const Home = () => {
  // Ref
  const audioRef = useRef(null);

  //state
  const [libraryStatus, setlibraryStatus] = useState(false);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const updateTimeHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    //...展開運算子
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  return (
    <AppContainer libraryStatus={libraryStatus}>
      <Nav libraryStatus={libraryStatus} setlibraryStatus={setlibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
      />
      <audio
        onLoadedMetadata={updateTimeHandler}
        onTimeUpdate={updateTimeHandler}
        ref={audioRef}
        src={currentSong.audio}
      />
    </AppContainer>
  );
};

//useref也會更新但是不會 re render
//nav : 用true false判斷要不要出現左側頁面
//song : 純粹傳歌曲圖片 名稱 作曲者
//player : 要播放歌曲

const AppContainer = styled.div`
  transition: all 0.5s ease;
  margin-left: ${(p) => (p.libraryStatus ? "20rem" : "0")};
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

export default Home;
