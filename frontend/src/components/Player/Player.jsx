import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';
import './Player.css';

export const Player = ({ songs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const currentSong = songs[currentIndex];
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === songs.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? songs.length - 1 : prevIndex - 1));
  };

  const handleCanPlayThrough = () => {
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTimeUpdate = (event) => {
    setCurrentTime(event.target.currentTime);
  };

  const handleSeek = (event) => {
    const seekTime = event.target.value;
    setCurrentTime(seekTime);
    const audioElement = audioRef.current;
    audioElement.currentTime = seekTime;
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration);
    };

    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div className="d-flex flex-column align-items-center py-5 player">
      <h2>{currentSong.name}</h2>
      <audio
        ref={audioRef}
        src={currentSong.url}
        controls={false}
        onCanPlayThrough={handleCanPlayThrough}
      />
      <div className="controls my-2">
        <FaStepBackward className="icon" onClick={handlePrevious} />
        {isPlaying ? (
          <FaPause className="icon mx-4" onClick={handlePlayPause} />
        ) : (
          <FaPlay className="icon mx-4" onClick={handlePlayPause} />
        )}
        <FaStepForward className="icon" onClick={handleNext} />
      </div>
      <div className="progress-container container mt-2 d-flex align-items-center">
        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="progress-bar mx-3"
        />
        <p>{formatTime(duration)}</p>
      </div>
    </div>
  );
};
