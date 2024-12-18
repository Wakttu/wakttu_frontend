// 필요한 컴포넌트 및 타입 임포트
import Header from '@/containers/game/music/Header';
import PlayerList from '@/containers/game/music/PlayerList';
import Chat from '@/containers/game/music/Chat';
import { Container } from '@/styles/music/Layout';
import {
  exit,
  musicReady,
  musicRound,
  socket,
} from '@/services/socket/socket';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGame, setGame } from '@/redux/game/gameSlice';
import { selectUserInfo, setUserInfo } from '@/redux/user/userSlice';
import { selectRoomInfo, setRoomInfo } from '@/redux/roomInfo/roomInfoSlice';
import { setMusic, selectMusic } from '@/redux/music/musicSlice';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';
import { clearGame } from '@/redux/game/gameSlice';
import { clearRoomInfo } from '@/redux/roomInfo/roomInfoSlice';
import Music from '@/components/game/music/Music';
import {
  clearAnswer,
  clearSuccess,
  selectAnswer,
  selectPause,
  setAnswer,
  setFail,
  setPause,
} from '@/redux/answer/answerSlice';
import {
  clearTimer,
  selectTimer,
  setTimer,
  tick,
} from '@/redux/timer/timerSlice';
import { client, updatePlayCount, updatePlayCountLocal, updateResult, updateResultLocal } from '@/services/api';
import { clearResult, selectResult } from '@/redux/result/resultSlice';
import { clearHistory } from '@/redux/history/historySlice';
import { openModal, setDataModal } from '@/redux/modal/modalSlice';
import { setAchieve } from '@/redux/achieve/achieveSlice';

// 게임 컴포넌트
const Game = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const game = useSelector(selectGame);
  const user = useSelector(selectUserInfo);
  const roomInfo = useSelector(selectRoomInfo);
  const music = useSelector(selectMusic);
  const answer = useSelector(selectAnswer);
  const timer = useSelector(selectTimer);
  const result = useSelector(selectResult);

  // Refs, State 관리
  const playerRef = useRef<ReactPlayer | null>(null); // 음악 플레이어 ref
  const [gameData, setGameData] = useState(null); // 게임 데이터
  const [volume, setVolume] = useState(10); // 볼륨 상태
  const [prevVolume, setPrevVolume] = useState(volume);
  const hasHandledPlayRef = useRef(false); // play 이벤트 처리 여부 추적
  const hasCalledMusicReady = useRef(false); // musicReady 호출 여부 추적
  const hintTimeoutsRef = useRef<NodeJS.Timeout[]>([]); // 힌트 타이머 참조 배열

  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태
  const [systemLog, setSystemLog] = useState<string[]>([]); // 빈 문자열 배열로 초기화
  const [isVideoVisible, setIsVideoVisible] = useState(false); // 추가된 상태

  // 소켓 이벤트 리스너 설정
  useEffect(() => {
    // 소켓 연결 핸들러
    const handleConnect = () => {
      console.log('소켓 연결 성공');
    };

    // 게임 시작 핸들러
    const handleStart = async (data: any) => {
      console.log('start 요청 들어옴');
    };

    // 라운드 변경 핸들러
    const handleRound = (data: any) => {
      if (data.music && data.round > 0) {
        const currentMusic = data.music[data.round];
        dispatch(setGame(data));
        dispatch(setAnswer({ success: false, answer: '', pause: false, word: undefined }));
        dispatch(setMusic(currentMusic));
        dispatch(setTimer({ roundTime: 4000, turnTime: 4000 }));
        playerRef.current?.seekTo(music?.videoStartSec || 0, 'seconds');
        setIsPlaying(true);

        socket.emit('music.ping', roomInfo.id);
      }
    };

    // 음악 재생 핸들러
    const handlePlay = async (data: any) => {
      if (hasHandledPlayRef.current) {
        return;
      }
      hasHandledPlayRef.current = true;

      console.log(`play 요청 들어옴 : ${data}`)

      // 정답 값 업데이트
      dispatch(setGame(data));
      dispatch(setMusic(data.music[data.round]));
      dispatch(setAnswer({ success: false, answer: '', pause: false, word: undefined }));

      if (playerRef.current) {
        dispatch(setTimer({ roundTime: 4000, turnTime: 4000 }));
        playerRef.current.seekTo(music?.videoStartSec || 0, 'seconds');
        setIsPlaying(true);
        if (game.host === user.id) socket.emit('music.ping', roomInfo.id);
      }
    };

    const handlePing = (data: any) => {
      dispatch(tick());
      if (timer.countTime === 700 && music?.hint[0]) {
        setSystemLog(prev => [...prev, music?.hint[0]])
      }
      if (timer.countTime === 1300 && music?.hint[1]) {
        setSystemLog(prev => [...prev, music?.hint[1]])
      }

      if (timer.countTime === 2400) {
        dispatch(setAnswer({ 
          success: false, answer: '', pause: true, word: undefined 
        }));
      }
    };

    const handlePong = async (data: any) => {
      setIsVideoVisible(true);

      setTimeout(() => {
        setIsVideoVisible(false);
      }, 4000);

      setTimeout(async () => {
        setSystemLog([]);
        if (game.host === user.id) await musicRound(roomInfo.id!);
      }, 4100);
    };

    const handleAnswer = (data: any) => {
      console.log(data);
      dispatch(setGame(data));
    };

    const handleEnd = async (data: any) => {
      console.log('게임이 종료되었습니다.');
      try {
        const { game, roomInfo } = data;
        const response = await client.get(`/user/${user.id}`);
        if (response) await dispatch(setUserInfo(response.data));

        dispatch(clearResult());
        dispatch(clearAnswer());
        dispatch(clearTimer());
        dispatch(clearHistory());

        dispatch(setDataModal(data));
        dispatch(openModal('RESULT'));

        let achieve: any[] = [];
        const ach_1 =
          user.provider === 'waktaverse.games'
            ? await updatePlayCount(game.type)
            : await updatePlayCountLocal(game.type);
        const ach_2 =
          user.provider === 'waktaverse.games'
            ? await updateResult(result)
            : await updateResultLocal(result);
        if (ach_1) achieve = [...achieve, ...ach_1];
        if (ach_2) achieve = [...achieve, ...ach_2];
        await dispatch(setAchieve(achieve));

        await router.push('/room');
        await dispatch(setRoomInfo(roomInfo));
        await dispatch(setGame(game));
        await dispatch(clearTimer());
        await dispatch(clearAnswer());
        await dispatch(clearResult());
        await dispatch(clearHistory());
      } catch (error) {
        console.error('Failed to update achievements:', error);
      }
    };

    // 소켓 이벤트 리스너 등록
    socket.on('connect', handleConnect);
    socket.on('music.start', handleStart);
    socket.on('music.round', handleRound);
    socket.on('music.play', handlePlay);
    socket.on('music.end', handleEnd);
    socket.on('music.answer', handleAnswer);
    socket.on('music.ping', handlePing);
    socket.on('music.pong', handlePong);

    // 클린업 함수
    return () => {
      socket.off('connect', handleConnect);
      socket.off('music.start', handleStart);
      socket.off('music.round', handleRound);
      socket.off('music.play', handlePlay);
      socket.off('music.end', handleEnd);
      socket.off('music.answer', handleAnswer);
      socket.off('music.ping', handlePing);
      socket.off('music.pong', handlePong);
      
      // 남아있는 힌트 타이머 정리
      hintTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, [dispatch, music, timer]);

  // 볼륨 변경 시 플레이어 볼륨 업데이트
  useEffect(() => {
    if (playerRef.current && music) {
      playerRef.current.getInternalPlayer()?.setVolume(volume);
    }
  }, [music, volume]);

  // 플레이어 준비 완료 핸들러
  const handlePlayerReady = (player: ReactPlayer) => {
    playerRef.current = player;
    if (roomInfo.id && !hasCalledMusicReady.current) {
      hasCalledMusicReady.current = true;
      setTimeout(async () => {
        await musicReady(roomInfo.id as string);
      }, 1800);
    }
  };

  // 볼륨 변경 핸들러
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value || volume.toString(), 10);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.getInternalPlayer()?.setVolume(newVolume / 100);
    }
  };

  // 볼륨 업데이트 함수 - 80ms 쓰로틀링 적용
  const handleVolumeUpdate = useCallback(
    (() => {
      let lastUpdate = 0;

      return (event: React.ChangeEvent<HTMLInputElement>) => {
        const now = Date.now();
        const newVolume = Math.min(100, Math.max(0, parseInt(event.target.value, 10))); // 볼륨 범위 제한
        setVolume(newVolume); // 로컬 상태 즉시 업데이트

        // 마지막 업데이트로부터 80ms가 지났는지 확인
        if (now - lastUpdate >= 80) {
          const player = playerRef.current?.getInternalPlayer();
          if (player) {
            player.setVolume(newVolume / 100);
          }
          lastUpdate = now;
        }
      };
    })(),
    []
  );

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

  return (
    <Container>
      <Header />
      <Music
        music={music}
        timer={timer}
        handlePlayerReady={handlePlayerReady}
        handleVolumeUpdate={handleVolumeUpdate}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
        playing={isPlaying}
        systemLog={systemLog}
        isVideoVisible={isVideoVisible}
        setIsVideoVisible={setIsVideoVisible}
        playerRef={playerRef}
      />
      <PlayerList />
      <Chat />
    </Container>
  );
};

export default Game;
