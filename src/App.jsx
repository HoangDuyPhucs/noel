import React, { useRef, useState, useEffect } from 'react';
import './App.css';

import santaDogImg from './assets/santa-dog.png';
import giftCloseImg from './assets/gift-close.png';
import giftOpenImg from './assets/gift-open.png';
import fingerImg from './assets/finger.png';
import bgMusic from './assets/bgMusic.mp3';
import { Button, Space } from 'antd';
import { ReloadOutlined, SoundOutlined, SoundFilled } from '@ant-design/icons';


const IntroScreen = ({ onStart }) => {
  return (
    <div className="intro-screen" onClick={onStart}>
      <div className="intro-content">
        <h1>🎄 Merry Christmas 🎄</h1>
        <p>Click anywhere to start</p>
      </div>
    </div>
  );
};

const SantaDogImage = () => (
  <img src={santaDogImg} className="santa-dog-image" draggable={false} />
);

const Snowflakes = () => {
  const flakes = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 10,
    size: 0.6 + Math.random()
  }));

  return (
    <>
      {flakes.map(f => (
        <div
          key={f.id}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
            fontSize: `${f.size}rem`
          }}
        >
          ❄
        </div>
      ))}
    </>
  );
};

export default function App() {
  const santaRef = useRef(null);

  const [restartKey, setRestartKey] = useState(0);
  const [giftPos, setGiftPos] = useState(null);
  const [giftStage, setGiftStage] = useState('hidden');
  const audioRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  // hidden → drop → open → finger

  /* Santa tới giữa → thả quà */
  useEffect(() => {
    setGiftStage('hidden');
    setGiftPos(null);

    const t = setTimeout(() => {
      if (!santaRef.current) return;
      const rect = santaRef.current.getBoundingClientRect();
      setGiftPos({
        left: rect.left + rect.width / 2,
        top: rect.top + rect.height / 2
      });
      setGiftStage('drop');
    }, 13000 * 0.55);

    return () => clearTimeout(t);
  }, [restartKey]);

  useEffect(() => {
  audioRef.current = new Audio(bgMusic);
  audioRef.current.loop = true;
  audioRef.current.volume = 0.5; // chỉnh to nhỏ tại đây

  return () => {
    audioRef.current?.pause();
    audioRef.current = null;
  };
}, []);
const toggleMusic = () => {
  if (!audioRef.current) return;

  if (musicPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play().catch(() => {
      console.log('Autoplay blocked');
    });
  }

  setMusicPlaying(!musicPlaying);
};


  /* Điều khiển stage */
  useEffect(() => {
    if (giftStage === 'drop') {
      const t = setTimeout(() => setGiftStage('open'), 2800);
      return () => clearTimeout(t);
    }
    if (giftStage === 'open') {
      const t = setTimeout(() => setGiftStage('finger'), 500);
      return () => clearTimeout(t);
    }
  }, [giftStage]);

  return (
    <div className="app">
      <Snowflakes />
      <div className="ground" />

      <div className="scene" key={restartKey}>
        <div className="moving-group" ref={santaRef}>
          <SantaDogImage />
        </div>

        {giftPos && giftStage !== 'hidden' && (
          <div
            className={`gift-container ${giftStage !== 'drop' ? 'opened' : ''}`}
            style={{
              left: giftPos.left,
              top: giftPos.top
            }}
          >
            <div className="gift-box">
              <img
                src={giftStage === 'drop' ? giftCloseImg : giftOpenImg}
                className="gift-base"
                draggable={false}
              />

              {giftStage === 'finger' && (
                <img
                  src={fingerImg}
                  className="finger-from-gift"
                  draggable={false}
                />
              )}
            </div>
          </div>
        )}
      </div>
<div className="control-buttons">
  <Space direction="vertical" size={12}>
    <Button
      type="primary"
      shape="round"
      icon={<ReloadOutlined />}
      onClick={() => setRestartKey(k => k + 1)}
      className="control-btn restart-btn"
    >
      Restart
    </Button>

    <Button
      type="default"
      shape="round"
      icon={musicPlaying ? <SoundOutlined /> : <SoundFilled />}
      onClick={toggleMusic}
      className="control-btn music-btn"
    >
      {musicPlaying ? 'Music Off' : 'Music On'}
    </Button>
  </Space>
</div>

      <div className="title">
        <h1>Merry Christmas! 🎄</h1>
        <p>Santa has a special delivery for you...</p>
      </div>
    </div>
  );
}
