// 필요한 컴포넌트 및 타입 임포트
import Header from '@/containers/game/music/Header';
import PlayerList from '@/containers/game/music/PlayerList';
import Chat from '@/containers/game/music/Chat';
import { Container } from '@/styles/music/Layout';
import {
  exit,
  musicRound,
  socket,
} from '@/services/socket/socket';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGame, setGame } from '@/redux/game/gameSlice';
import { selectUserInfo } from '@/redux/user/userSlice';
import { selectRoomInfo, setRoomInfo } from '@/redux/roomInfo/roomInfoSlice';
import { setMusic, selectMusic } from '@/redux/music/musicSlice';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';
import { clearGame } from '@/redux/game/gameSlice';
import { clearRoomInfo } from '@/redux/roomInfo/roomInfoSlice';
import Music from '@/components/game/music/Music';

// 게임 컴포넌트
const Game = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const game = useSelector(selectGame);
  const user = useSelector(selectUserInfo);
  const roomInfo = useSelector(selectRoomInfo);
  const music = useSelector(selectMusic);

  // Refs, State 관리
  const playerRef = useRef<ReactPlayer | null>(null); // 음악 플레이어 ref
  const [gameData, setGameData] = useState(null); // 게임 데이터
  const [volume, setVolume] = useState(10); // 볼륨 상태
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태
  const [systemLog, setSystemLog] = useState([]); // 시스템 로그

  // 소켓 이벤트 리스너 설정
  useEffect(() => {
    // 소켓 연결 핸들러
    const handleConnect = () => {
      console.log('소켓 연결 성공');
    };

    // 게임 시작 핸들러
    const handleStart = (data: any) => {
      console.log('start:', data);
      setGameData(data);
    };

    // 라운드 변경 핸들러
    const handleRound = (data: any) => {
      console.log('round:', data);
      if (data.music && data.round > 0) {
        const currentMusic = data.music[data.round - 1];
        setIsPlaying(false);
        dispatch(setMusic(currentMusic));
      }
    };

    // 음악 재생 핸들러
    const handlePlay = (data: any) => {
      console.log('재생', data);
      if (playerRef.current) {
        setIsPlaying(true);
        playerRef.current.seekTo(music?.videoStartSec || 0, 'seconds');
      }
    };

    // 소켓 이벤트 리스너 등록
    socket.on('connect', handleConnect);
    socket.on('music.start', handleStart);
    socket.on('music.round', handleRound);
    socket.on('music.play', handlePlay);

    // 클린업 함수
    return () => {
      socket.off('connect', handleConnect);
      socket.off('music.start', handleStart);
      socket.off('music.round', handleRound);
      socket.off('music.play', handlePlay);
    };
  }, [dispatch, music]);

  // 게임 시작 시 호스트의 첫 라운드 시작
  useEffect(() => {
    const opening = setTimeout(() => {
      if (game.host === user.id) {
        musicRound(roomInfo.id as string);
      }
    }, 2000);

    return () => clearTimeout(opening);
  }, [game.host, user.id, roomInfo.id]);

  // 볼륨 변경 시 플레이어 볼륨 업데이트
  useEffect(() => {
    if (playerRef.current && music) {
      playerRef.current.getInternalPlayer()?.setVolume(volume);
    }
  }, [music, volume]);

  // 플레이어 준비 완료 핸들러
  const handlePlayerReady = (player: ReactPlayer) => {
    playerRef.current = player;
    console.log('Player Ready:', playerRef.current);
    
    if (roomInfo.id) {
      socket.emit('music.ready', roomInfo.id);
    }
  };

  // 다음 라운드 진행 핸들러
  const handleNextRound = () => {
    if (roomInfo.id) {
      socket.emit('music.round', roomInfo.id);
    }
  };

  // 볼륨 변경 핸들러
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.getInternalPlayer()?.setVolume(newVolume / 100);
    }
  };

  // 게임 종료 핸들러
  const exitGame = useCallback(async () => {
    await router.push('/roomlist');
    await dispatch(clearRoomInfo());
    await dispatch(clearGame());
    exit(roomInfo.id as string);
  }, [dispatch, roomInfo.id, router]);

  // 연결 끊김 처리
  useEffect(() => {
    const handleDisconnect = () => {
      router.replace('/');
    };

    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('disconnect', handleDisconnect);
    };
  }, [router]);

  // 게임 나가기 처리
  useEffect(() => {
    socket.on('exit', (data) => {
      const { roomInfo, game } = data;

      if (!roomInfo || !game) return;

      dispatch(setRoomInfo(roomInfo));
      dispatch(setGame(game));

      if (roomInfo.users && roomInfo.users.length <= 1) {
        router.push('/room');
      }
    });

    return () => {
      socket.off('exit');
    };
  }, [dispatch, router]);

  // 음악 정지 핸들러
  const stopPlaying = () => {
    setIsPlaying(false);
  };

  // 음악 정지 이벤트 처리
  useEffect(() => {
    socket.on('music.stop', () => {
      stopPlaying();
    });

    return () => {
      socket.off('music.stop');
    };
  }, []);

  return (
    <Container>
      <Header />
      <Music
        handlePlayerReady={handlePlayerReady} 
        volume={volume} 
        handleVolumeChange={handleVolumeChange}
        playing={isPlaying}
        handleNextRound={handleNextRound}
        systemLog={systemLog}
      />
      <PlayerList />
      <Chat />
    </Container>
  );
};

export default Game;
