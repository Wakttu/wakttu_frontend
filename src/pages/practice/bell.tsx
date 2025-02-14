import Game from '@/containers/game/bell/Bell';
import Chat from '@/containers/game/bell/Chat';
import Header from '@/containers/game/bell/Header';
import PlayerList from '@/containers/game/bell/PlayerList';
import useEffectSound from '@/hooks/useEffectSound';
import useSound from '@/hooks/useSound';
import { setAchieve } from '@/redux/achieve/achieveSlice';
import {
  clearAnswer,
  selectPause,
  setAnswer,
  setPause,
} from '@/redux/answer/answerSlice';
import { selectBgmVolume, selectEffectVolume } from '@/redux/audio/audioSlice';
import { selectGame, setGame } from '@/redux/game/gameSlice';
import { clearHistory } from '@/redux/history/historySlice';
import { closeModal, openModal, setDataModal } from '@/redux/modal/modalSlice';
import { clearResult, selectResult } from '@/redux/result/resultSlice';
import { selectRoomInfo, setRoomInfo } from '@/redux/roomInfo/roomInfoSlice';
import {
  clearTimer,
  selectTimer,
  setTimer,
  tick,
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
  bellRound,
  bellRoundEnd,
  bellRoundStart,
  sendEmoticon,
  socket,
} from '@/services/socket/socket';
import { Container } from '@/styles/bell/Layout';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Bell = () => {
  const user = useSelector(selectUserInfo);
  const game = useSelector(selectGame);
  const roomInfo = useSelector(selectRoomInfo);
  const dispatch = useDispatch();
  const router = useRouter();
  const result = useSelector(selectResult);
  const emoticonId = useSelector(selectEmoticon);

  // sound 세팅

  const bgmVolume = useSelector(selectBgmVolume);
  const effectVolume = useSelector(selectEffectVolume);
  const sound = useSound(
    '/assets/bgm/lossy/ui_in-game-b.webm',
    bgmVolume,
    0,
    true
  );

  const bellStartSound = useEffectSound(
    '/assets/sound-effects/lossy/bell_start.webm',
    effectVolume
  );

  const bellRoundStartSound = useEffectSound(
    '/assets/sound-effects/lossy/bell_round_start.webm',
    effectVolume
  );

  const bellRoundEndSound = useEffectSound(
    '/assets/sound-effects/lossy/bell_round_end.webm',
    effectVolume
  );

  const correctSound = useEffectSound(
    '/assets/sound-effects/lossy/bell_correct.webm',
    effectVolume
  );

  const emoticonRef = useRef(0);

  // Function part

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

  const onBgm = useCallback(() => {
    if (sound) {
      sound.play();
    }
  }, [sound]);

  useEffect(() => {
    onBgm();
  }, [onBgm]);

  useEffect(() => {
    const opening = setTimeout(() => {
      if (game.host === user.id) {
        console.log('opening');
        bellRound(roomInfo.id as string);
        if (bellStartSound) bellStartSound.play();
      }
    }, 2000);
    return () => {
      clearTimeout(opening);
    };
  }, [roomInfo.id, user.id, bellStartSound]);

  useEffect(() => {
    socket.on('bell.round', (data) => {
      dispatch(clearAnswer());
      setTimeout(() => {
        dispatch(setTimer({ roundTime: 30000, turnTime: 30000 }));
        dispatch(setGame(data));
        if (game.host === user.id) bellRoundStart(roomInfo.id as string);
      }, 2000);
    });
    return () => {
      socket.off('bell.round');
    };
  }, [dispatch, game.host, roomInfo.id, user.id]);

  useEffect(() => {
    socket.on('bell.roundStart', () => {
      setTimeout(() => {
        if (game.host === user.id) socket.emit('bell.ping', roomInfo.id);
        dispatch(setPause(true));
        if (bellRoundStartSound) bellRoundStartSound.play();
      }, 3000);
    });

    socket.on('bell.roundEnd', (data) => {
      dispatch(setGame(data));

      if (game.host === user.id)
        setTimeout(() => bellRound(roomInfo.id as string), 3000);
      if (bellRoundEndSound) bellRoundEndSound.play();
    });

    return () => {
      socket.off('bell.roundStart');
      socket.off('bell.roundEnd');
    };
  }, [
    dispatch,
    game.host,
    roomInfo.id,
    user.id,
    bellRoundEndSound,
    bellRoundStartSound,
  ]);

  useEffect(() => {
    socket.on('bell.game', (data) => {
      dispatch(setGame(data));
      if (correctSound) correctSound.play();
    });

    return () => {
      socket.off('bell.game');
    };
  }, [dispatch, game, correctSound]);

  useEffect(() => {
    socket.on('bell.ping', () => {
      dispatch(tick());
    });

    socket.on('bell.pong', async () => {
      if (game.host === user.id) await bellRoundEnd(roomInfo.id!);
      dispatch(
        setAnswer({
          success: true,
          pause: false,
          answer: game.target,
          word: undefined,
        })
      );
    });

    return () => {
      socket.off('bell.ping');
      socket.off('bell.pong');
    };
  });

  useEffect(() => {
    socket.on('bell.result', async (data) => {
      try {
        dispatch(clearResult());
        dispatch(clearAnswer());
        dispatch(clearTimer());
        dispatch(clearHistory());
      } catch (error) {
        console.error('Failed to Result:', error);
        dispatch(closeModal());
        // 에러 상태 처리
      }
    });

    socket.on('bell.end', async (data) => {
      try {
        const { game, roomInfo } = data;

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
      socket.off('bell.result');
      socket.off('bell.end');
    };
  }, [dispatch, game.type, result, router, user.id, user.provider]);

  useEffect(() => {
    socket.on('exit.practice', (data) => {
      const { roomInfo, game } = data;

      if (!roomInfo || !game) return;

      dispatch(setRoomInfo(roomInfo));
      dispatch(setGame(game));
      dispatch(clearTimer());

      if (roomInfo.users && roomInfo.users.length <= 1) {
        router.push('/room');
      }
    });

    return () => {
      socket.off('exit.practice');
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
      <Header practice={true} />
      <Game />
      <PlayerList />
      <Chat />
    </Container>
  );
};

export default Bell;
