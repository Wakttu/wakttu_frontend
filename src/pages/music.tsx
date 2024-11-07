import { socket } from '@/services/socket/socket';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import YouTube from 'react-youtube';

const Music: React.FC = () => {
  const [gameData, setGameData] = useState(null);
  const [music, setMusic] = useState<{ [key: string]: any } | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('소켓 연결 성공');
    });
    socket.on('music.start', (gameData) => {
      console.log('start:', gameData);
      setGameData(gameData);
    });

    socket.on('music.round', (gameData) => {
      console.log('round:', gameData);
      setGameData(gameData);
      if (gameData.music && gameData.round > 0) {
        setMusic(gameData.music[gameData.round - 1]);
      }
    });

    socket.on('music.play', (gameData) => {
      console.log('play:', gameData);
      if (playerRef.current) {
        playerRef.current.playVideo();
      }
    });

    return () => {
      socket.off('connect');
      socket.off('music.start');
      socket.off('music.round');
      socket.off('music.play');
    };
  }, [music]);

  const handleStartGame = () => {
    socket.emit('music.start', '123');
  };

  const handleNextRound = () => {
    socket.emit('music.round', '123');
  };

  const connectSocket = () => {
    socket.connect();
  };

  const onReady = (event: any) => {
    console.log('onReady');
    console.log(music?.videoId);
    socket.emit('music.ready', '123');
    playerRef.current = event.target;

    console.log(playerRef.current);
  };

  return (
    <div>
      <button onClick={connectSocket}>소켓 연결</button>
      <button onClick={handleStartGame}>게임 시작</button>
      <button onClick={handleNextRound}>다음 라운드</button>
      {music && (
        <YouTube
          videoId={music.videoId}
          opts={{
            width: '560',
            height: '315',
            playerVars: {
              autoplay: 0,
            },
          }}
          onReady={onReady}
        />
      )}
    </div>
  );
};

export default Music;
