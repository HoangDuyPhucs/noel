import React, { useState } from 'react';
import './App.css';
import santaDogImg from './assets/santa-dog.png';
import giftImg from './assets/gift.png';
import fingerImg from './assets/finger.png';


const SantaDogImage = () => (
  <img
    src={santaDogImg}
    alt="Santa and Dog Sleigh"
    className="santa-dog-image"
    draggable={false}
  />
);
const GiftImage = () => (
  <img
    src={giftImg}
    alt="Gift Box"
    className="gift-image"
    draggable={false}
  />
);

const FingerImage = () => (
  <img
    src={fingerImg}
    alt="Finger"
    className="finger-image"
    draggable={false}
  />
);


// SVG Middle Finger Component
// Snowflake Component
const Snowflakes = () => {
  const flakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 10,
    size: 0.5 + Math.random() * 1
  }));

  return (
    <>
      {flakes.map(flake => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
            fontSize: `${flake.size}rem`
          }}
        >
          ❄
        </div>
      ))}
    </>
  );
};

function App() {
  const [restartKey, setRestartKey] = useState(0);

  const [musicPlaying, setMusicPlaying] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [audioElement] = useState(new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'));
  const restartAnimation = () => {
      setGiftOpened(false);   // 👈 QUAN TRỌNG

    setRestartKey(prev => prev + 1);
  };

  const toggleMusic = () => {
    if (musicPlaying) {
      audioElement.pause();
    } else {
      audioElement.play().catch(() => {
        console.log('Audio playback failed');
      });
      audioElement.loop = true;
    }
    setMusicPlaying(!musicPlaying);
  };

  const handleGiftAnimationEnd = () => {
    setGiftOpened(true);
  };

  return (
    <div className="app">
      <Snowflakes />
      
      <div className="ground"></div>
      
<div className="scene" key={restartKey}>
<div className="moving-group">
  <SantaDogImage />
</div>

        
<div className="gift-container" onAnimationEnd={handleGiftAnimationEnd}>
  {!giftOpened && <GiftImage />}
</div>

{giftOpened && (
  <div className="finger-container">
    <FingerImage />
  </div>
)}

      </div>
      <button className="music-button" onClick={restartAnimation}>
        🔄 Restart Animation
      </button>
      <button className="music-button" onClick={toggleMusic}>
        {musicPlaying ? '🔇 Stop Music' : '🎵 Play Music'}
      </button>
      
      <div className="title">
        <h1>Merry Christmas! 🎄</h1>
        <p>Santa has a special delivery for you...</p>
      </div>
    </div>
  );
}

export default App;