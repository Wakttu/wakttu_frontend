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
      console.log(gameData);
      setGameData(gameData);
    });

    socket.on('music.round', (gameData) => {
      console.log(gameData);
      setGameData(gameData);
      setMusic(gameData.music[gameData.round]);
    });

    socket.on('music.play', (gameData) => {
      console.log(gameData);
      if (playerRef.current) {
        playerRef.current.playVideo();
      }
    });

    return () => {
      socket.off('connect');
      socket.off('music.start');
      socket.off('music.round');
    };
  }, []);

  useEffect(() => {
    console.log(music);
  }, [music]);

  const handleStartGame = () => {
    socket.emit('music.start', { roomId: '123' });
  };

  const handleNextRound = () => {
    socket.emit('music.round', { roomId: '123' });
  };

  const connectSocket = () => {
    socket.connect();
  };

  const onReady = useCallback((event: any) => {
    console.log('onReady');
    socket.emit('music.ready', { roomId: '123' });
    playerRef.current = event.target;
  }, []);

  return (
    <div>
      <button onClick={connectSocket}>소켓 연결</button>
      <button onClick={handleStartGame}>게임 시작</button>
      <button onClick={handleNextRound}>다음 라운드</button>
      {music && (
        <YouTube
          key={music.videoId}
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
