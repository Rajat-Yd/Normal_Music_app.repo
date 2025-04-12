import { useRef, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'Chasing',
    songArtist: 'NEFFEX',
    songSrc: './Assets/songs/Chasing - NEFFEX.mp3',
    songAvatar: './Assets/Images/Myicon.jpeg',
  });

  // State Variables
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [isLooping, setIsLooping] = useState(false);
  const currentAudio = useRef();

  // Music API
  const musicAPI = [
    {
      songName: 'Chasing',
      songArtist: 'NEFFEX',
      songSrc: './Assets/songs/Chasing - NEFFEX.mp3',
      songAvatar: './Assets/Images/Myicon.jpeg',
    },
    {
      songName: 'AURORA - Runaway',
      songArtist: 'Aurora Aksnes',
      songSrc: './Assets/songs/AURORA - Runaway (Lyrics).mp3',
      songAvatar: './Assets/Images/Myicon.jpeg',
    },
    {
      songName: 'Catch Me If I Fall',
      songArtist: 'TEGNENT',
      songSrc: './Assets/songs/Catch Me If I Fall - NEFFEX.mp3',
      songAvatar: './Assets/Images/Myicon.jpeg',
    },
    {
      songName: 'Inspired (Clean)',
      songArtist: 'NEFFEX',
      songSrc: './Assets/songs/Inspired (Clean) - NEFFEX.mp3',
      songAvatar: './Assets/Images/Myicon.jpeg',
    },
    {
      songName: 'Suzume',
      songArtist: 'Radwimps',
      songSrc: './Assets/songs/Suzume.mp3',
      songAvatar: './Assets/Images/Myicon.jpeg',
    },
    {
      songName: 'Matushka UltraFunk',
      songArtist: 'Radwimps',
      songSrc: './Assets/songs/Matushka-1.mp3',
      songAvatar: './Assets/Images/Myicon.jpeg',
    },
    {
      songName: 'Let me Down Slowly',
      songArtist: 'Radwimps',
      songSrc: './Assets/songs/Let me down slowly.mp3',
      songAvatar: './Assets/Images/Myicon.jpeg',
    },
    {
      songName: 'Love me like you do',
      songArtist: 'Radwimps',
      songSrc: './Assets/songs/LVMLYD.mp3',
      songAvatar: './Assets/Images/Myicon.jpeg',
    },
    {
      songName: 'Paint The Town Red',
      songArtist: 'Radwimps',
      songSrc: './Assets/songs/Paint The Town Red.mp3',
      songAvatar: './Assets/Images/Myicon.jpeg',
    },
    {
      songName:'sugar crash',
      songArtist:'ElyOtto',
      songSrc:'./Assets/songs/sugar crash.mp3',
      songAvatar:'./Assets/Images/Myicon.jpeg',
    },
    {
      songName:'Die with a smile',
      songArtist:'ElyOtto',
      songSrc:'./Assets/songs/Die With a Smile.mp3',
      songAvatar:'./Assets/Images/Myicon.jpeg',
    },
    {
      songName:'Darkside',
      songArtist:'ElyOtto',
      songSrc:'./Assets/songs/Darkside.mp3',
      songAvatar:'./Assets/Images/Myicon.jpeg',
    },
    {
      songName:'Dandelions',
      songArtist:'Ruth B',
      songSrc:'./Assets/songs/Dandelions.mp3',
      songAvatar:'./Assets/Images/Myicon.jpeg',
    },
    {
      songName:'Royalty',
      songArtist:'NEFFEX',
      songSrc:'./Assets/songs/Royalty.mp3',
      songAvatar:'./Assets/Images/Myicon.jpeg',
    },
    {
      songName:'Fairytale',
      songArtist:'NEFFEX',
      songSrc:'./Assets/songs/Fairytale.mp3',
      songAvatar:'./Assets/Images/Myicon.jpeg',
    }
  ];

  // Play Audio Function
  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  // Handle Next Song
  const handleNextSong = () => {
    setMusicIndex((prevIndex) => {
      const nextIndex = prevIndex >= musicAPI.length - 1 ? 0 : prevIndex + 1;
      updateCurrentMusicDetails(nextIndex);
      return nextIndex;
    });
  };

  // Handle Previous Song
  const handlePrevSong = () => {
    setMusicIndex((prevIndex) => {
      const prevIndexCalculated = prevIndex === 0 ? musicAPI.length - 1 : prevIndex - 1;
      updateCurrentMusicDetails(prevIndexCalculated);
      return prevIndexCalculated;
    });
  };

  // Update Current Music Details
  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar,
    });
    setIsAudioPlaying(true);

    // Update the onended event to play the next song
    currentAudio.current.onended = handleNextSong;
  };

  // Handle Audio Update
  const handleAudioUpdate = () => {
    // Input total length of the audio
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
    setMusicTotalLength(musicTotalLength0);

    // Input Music Current Time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${currentSec < 10 ? `0${currentSec}` : currentSec}`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  // Toggle Loop
  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  // Keyboard Event Handler
  const handleKeyDown = (event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      handleAudioPlay();
    } else if (event.code === 'ArrowRight') {
      handleNextSong();
    } else if (event.code === 'ArrowLeft') {
      handlePrevSong();
    }
  };

  // Add and Remove Event Listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="container">
        <audio
          ref={currentAudio}
          onEnded={handleNextSong}
          onTimeUpdate={handleAudioUpdate}
        ></audio>
        <div className="music-Container">
          <p className="musicPlayer">Music Player</p>
          <p className="music-Head-Name">{currentMusicDetails.songName}</p>
          <p className="music-Artist-Name">{currentMusicDetails.songArtist}</p>
          <img
            src={currentMusicDetails.songAvatar}
            alt="song Avatar"
            id="songAvatar"
          />
          <div className="musicTimerDiv">
            <p className="musicCurrentTime">{musicCurrentTime}</p>
            <p className="musicTotalLenght">{musicTotalLength}</p>
          </div>
          <input
            type="range"
            className="musicProgressBar"
            value={audioProgress}
            onChange={(e) => {
              setAudioProgress(e.target.value);
              currentAudio.current.currentTime = (e.target.value * currentAudio.current.duration) / 100;
            }}
          />
          <div className="musicControlers">
            <i className="fa-solid fa-backward musicControler" onClick={handlePrevSong}></i>
            <i
              className={`fa-solid ${isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'} playBtn`}
              onClick={handleAudioPlay}
            ></i>
            <i className="fa-solid fa-forward musicControler" onClick={handleNextSong}></i>
            <div
              className={`loopBtn ${isLooping ? 'active' : ''}`}
              onClick={toggleLoop}
              title={isLooping ? 'Disable Loop' : 'Enable Loop'}
            >
              <i className="fa-solid fa-repeat"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;