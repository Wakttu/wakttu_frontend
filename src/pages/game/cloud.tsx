import WeatherSlide from '@/components/game/cloud/Weather';
import Board from '@/containers/game/cloud/Board';
import ChatInput from '@/containers/game/cloud/ChatInput';
import ChatLog from '@/containers/game/cloud/ChatLog';
import Header from '@/containers/game/cloud/Header';
import Info from '@/containers/game/cloud/Info';
import PlayerList from '@/containers/game/cloud/PlayerList';
import useSound from '@/hooks/useSound';
import { setAchieve } from '@/redux/achieve/achieveSlice';
import { selectBgmVolume, selectVoiceVolume } from '@/redux/audio/audioSlice';
import { clearAnswer, setAnswer, setPause } from '@/redux/answer/answerSlice';
import { selectGame, setGame } from '@/redux/game/gameSlice';
import { clearHistory } from '@/redux/history/historySlice';
import { closeModal, openModal, setDataModal } from '@/redux/modal/modalSlice';
import { clearResult, selectResult } from '@/redux/result/resultSlice';
import { selectRoomInfo, setRoomInfo } from '@/redux/roomInfo/roomInfoSlice';
import {
  clearTimer,
  cloudTick,
  selectTimer,
  setTimer,
} from '@/redux/timer/timerSlice';
import {
  selectEmoticon,
  selectUserInfo,
  setUserInfo,
} from '@/redux/user/userSlice';
import {
  client,
  updatePlayCount,
  updatePlayCountLocal,
  updateResult,
  updateResultLocal,
} from '@/services/api';
import {
  cloudRound,
  cloudRoundEnd,
  cloudRoundStart,
  sendEmoticon,
  socket,
} from '@/services/socket/socket';
import { Container, Main } from '@/styles/cloud/Layout';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWaktaSound from '@/hooks/useWaktaSound';
import useEffectSound from '@/hooks/useEffectSound';

const Cloud = () => {
  const user = useSelector(selectUserInfo);
  const timer = useSelector(selectTimer);
  const roomInfo = useSelector(selectRoomInfo);
  const game = useSelector(selectGame);
  const router = useRouter();
  const result = useSelector(selectResult);
  const dispatch = useDispatch();

  const [weather, setWeather] = useState<string>();
  const [isOpen, setOpen] = useState(false);

  const emoticonId = useSelector(selectEmoticon);
  const emoticonRef = useRef(0);

  const voiceVolume = useSelector(selectVoiceVolume);
  const effectVolume = useSelector(selectBgmVolume);

  const waktaSound = useWaktaSound(voiceVolume);
  const correctSound = useEffectSound(
    '/assets/sound-effects/lossy/bell_correct.webm',
    effectVolume
  );
  // sound 세팅

  const bgmVolume = useSelector(selectBgmVolume);

  const sound = useSound(
    '/assets/bgm/lossy/ui_in-game-c.webm',
    bgmVolume,
    0,
    true
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      const allowedKeys = ['1', '2', '3']; // 허용 키
      const currentTime = Date.now();

      if (
        allowedKeys.includes(e.key) &&
        currentTime - emoticonRef.current > 2000
      ) {
        const allowkey = ['1', '2', '3'];
        if (!allowkey.includes(e.key)) return;
        const emoticon = emoticonId[e.key];
        if (emoticon && user.id && roomInfo.id) {
          const emoticonData = {
            roomId: roomInfo.id,
            userId: user.id,
            emoticonId: emoticon,
          };
          sendEmoticon(emoticonData);
          emoticonRef.current = currentTime;
        }
      }
    },
    [emoticonId, roomInfo.id, user.id]
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyUp]);

  useEffect(() => {
    const opening = setTimeout(() => {
      if (game.host === user.id) {
        console.log('opening');
        cloudRound(roomInfo.id as string);
      }
    }, 2000);
    return () => {
      clearTimeout(opening);
    };
  }, [roomInfo.id, user.id]);

  useEffect(() => {
    const playWaktaSound = (bgm: string) => {
      if (waktaSound && waktaSound[bgm]) {
        waktaSound[bgm].play();
      } else {
        correctSound?.play();
      }
    };

    socket.on('cloud.answer', playWaktaSound);

    return () => {
      socket.off('cloud.answer', playWaktaSound);
    };
  });

  useEffect(() => {
    const handleRound = (data: any) => {
      const { game, weather } = data;
      setWeather(weather);
      setOpen(true);
      dispatch(setGame(game));
      dispatch(setTimer({ roundTime: 40000, turnTime: 40000 }));
      if (sound) sound.pause();
      if (game.host == user.id)
        setTimeout(() => cloudRoundStart(roomInfo.id as string), 2000);
    };
    socket.on('cloud.round', handleRound);

    return () => {
      socket.off('cloud.round', handleRound);
    };
  }, [dispatch, roomInfo.id, sound, user.id]);

  useEffect(() => {
    socket.on('cloud.roundStart', () => {
      setTimeout(() => {
        if (game.host === user.id) socket.emit('cloud.ping', roomInfo.id);
        setOpen(false);
        dispatch(setPause(true));
        if (sound) sound.play();
      }, 3000);
    });

    socket.on('cloud.roundEnd', (data) => {
      dispatch(setGame(data));
      dispatch(setPause(false));
      if (game.host === user.id)
        setTimeout(() => cloudRound(roomInfo.id as string), 2000);
    });

    return () => {
      socket.off('cloud.roundStart');
      socket.off('cloud.roundEnd');
    };
  }, [dispatch, game.host, roomInfo.id, sound, user.id]);

  useEffect(() => {
    socket.on('cloud.game', (data) => {
      dispatch(setGame(data));
    });

    return () => {
      socket.off('cloud.game');
    };
  }, [dispatch, game]);

  useEffect(() => {
    socket.on('cloud.ping', () => {
      dispatch(cloudTick());
    });

    socket.on('cloud.pong', async () => {
      if (game.host === user.id) await cloudRoundEnd(roomInfo.id!);
    });

    return () => {
      socket.off('cloud.ping');
      socket.off('cloud.pong');
    };
  });

  useEffect(() => {
    socket.on('cloud.result', async (data) => {
      try {
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
      } catch (error) {
        console.error('Failed to update achievements:', error);
        dispatch(closeModal());

        // 에러 상태 처리
      }
    });

    socket.on('cloud.end', async (data) => {
      try {
        const { game, roomInfo } = data;
        const response = await client.get(`/user/${user.id}`);
        if (response) await dispatch(setUserInfo(response.data));

        await router.push('/room');
        await dispatch(setRoomInfo(roomInfo));
        await dispatch(setGame(game));
        await dispatch(clearTimer());
      } catch (error) {
        console.error('게임 종료 처리 중 오류 발생:', error);
        // 오류 발생 시 기본 페이지로 리다이렉트
        router.push('/');
      }
    });

    return () => {
      socket.off('cloud.result');
      socket.off('cloud.end');
    };
  }, [dispatch, game.type, result, router, user.id, user.provider]);

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

  useEffect(() => {
    const handleReconnect = (data: any) => {
      setRoomInfo(data.roomInfo);
      setGame(data.game);
    };

    socket.on('reconnect', handleReconnect);

    return () => {
      socket.off('reconnect', handleReconnect);
    };
  });

  return (
    <Container>
      <Header />
      {isOpen && weather && <WeatherSlide key={weather} weather={weather} />}
      <Main>
        <Info />
        <Board />
        <ChatLog />
      </Main>
      <PlayerList />
      <ChatInput />
    </Container>
  );
};

export default Cloud;
