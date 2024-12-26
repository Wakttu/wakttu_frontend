import Chat from '@/containers/game/kung/Chat';
import Header from '@/containers/game/kung/Header';
import Kung from '@/containers/game/kung/Kung';
import PlayerList from '@/containers/game/kung/PlayerList';
import { Container } from '@/styles/kung/Layout';
import {
  exit,
  kungRound,
  kungTurnEnd,
  kungTurnStart,
  sendEmoticon,
  socket,
} from '@/services/socket/socket';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearHistory, setHistory } from '@/redux/history/historySlice';
import { clearGame, selectGame, setGame } from '@/redux/game/gameSlice';
import {
  clearTimer,
  selectTimer,
  setTimer,
  setTurn,
  tick,
} from '@/redux/timer/timerSlice';
import {
  clearAnswer,
  clearSuccess,
  selectPause,
  setAnswer,
  setFail,
  setPause,
} from '@/redux/answer/answerSlice';
import {
  selectEmoticon,
  selectUserInfo,
  selectUserName,
  setUserInfo,
} from '@/redux/user/userSlice';
import {
  clearRoomInfo,
  selectRoomInfo,
  setRoomInfo,
} from '@/redux/roomInfo/roomInfoSlice';
import useSound from '@/hooks/useSound';
import useEffectSound from '@/hooks/useEffectSound';
import { useRouter } from 'next/router';
import {
  client,
  updatePlayCount,
  updatePlayCountLocal,
  updateResult,
  updateResultLocal,
} from '@/services/api';
import { GetKey } from '@/modules/Voice';
import useWaktaSound from '@/hooks/useWaktaSound';
import { selectVolume } from '@/redux/audio/audioSlice';
import {
  clearResult,
  selectResult,
  setResult,
} from '@/redux/result/resultSlice';
import { closeModal, openModal, setDataModal } from '@/redux/modal/modalSlice';
import { setAchieve } from '@/redux/achieve/achieveSlice';

const Game = () => {
  const dispatch = useDispatch();
  const game = useSelector(selectGame);
  const user = useSelector(selectUserInfo);
  const result = useSelector(selectResult);
  const roomInfo = useSelector(selectRoomInfo);
  const name = useSelector(selectUserName);
  const timer = useSelector(selectTimer);
  const router = useRouter();
  const pause = useSelector(selectPause);
  const emoticonId = useSelector(selectEmoticon);

  const { bgmVolume, effectVolume, voiceVolume } = useSelector(selectVolume);

  const [failUser, setFailuesr] = useState<{ name: string; count: number }>({
    name: '',
    count: 0,
  });

  /**
   * Sound Part
   */
  const sound = useSound(
    '/assets/bgm/lossy/ui_in-game-k.webm',
    bgmVolume,
    0,
    true
  );

  const startSound = useEffectSound(
    '/assets/sound-effects/lossy/kung_start.webm',
    effectVolume
  );

  const wrongSound = useEffectSound(
    '/assets/sound-effects/lossy/game_wrong.webm',
    effectVolume
  );
  const turnEndSound = useEffectSound(
    '/assets/sound-effects/lossy/game_turn_failure.webm',
    effectVolume
  );

  const answerSound = useEffectSound(
    '/assets/sound-effects/lossy/kung_correct.webm',
    effectVolume
  );
  const waktaSound = useWaktaSound(voiceVolume);

  const emoticonRef = useRef(0);

  /**
   * Function Part
   */

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

  const playAnswer = useCallback(
    ({
      id,
      wakta,
      type,
      meta,
    }: {
      id: string;
      wakta: boolean;
      type: string;
      meta?: { [x: string]: any };
    }) => {
      answerSound!.play();
      if (wakta) {
        const key = GetKey(type, meta);
        setTimeout(() => waktaSound![key].play(), 500);
      }
    },
    [answerSound, waktaSound]
  );

  // 실패횟수 잠수 특정 함수
  const onFailUser = useCallback(
    (userName?: string) => {
      if (!userName) setFailuesr({ name: '', count: 0 });
      else {
        if (failUser.name === userName)
          setFailuesr({
            ...failUser,
            count: game.chain === 1 ? failUser.count + 1 : 1,
          });
        else {
          setFailuesr({ name: userName, count: 1 });
        }
      }
    },
    [failUser, game.chain]
  );

  // Turn 시작시 BGM 켜는 함수
  const onBgm = useCallback(() => {
    if (sound) sound.play();
  }, [sound]);

  const exitGame = useCallback(async () => {
    await router.push('/roomlist');
    await dispatch(clearRoomInfo());
    await dispatch(clearGame());
    exit(roomInfo.id as string);
  }, [dispatch, roomInfo.id, router]);

  /**
   * Opening
   */

  useEffect(() => {
    const handleDisconnect = () => {
      router.replace('/');
    };

    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('disconnect', handleDisconnect);
    };
  }, [router]);

  useEffect(() => {
    const opening = setTimeout(() => {
      if (game.host === user.id) {
        console.log('opening');
        kungRound(roomInfo.id as string);
      }
    }, 2000);

    return () => {
      clearTimeout(opening);
    };
  }, [dispatch, roomInfo.id]);

  /**
   * Round 변할때마다 History Clear
   */
  useEffect(() => {
    dispatch(clearHistory());
  }, [game.round, dispatch]);

  /**
   * Round Logic
   */
  useEffect(() => {
    socket.on('kung.round', (data) => {
      dispatch(setGame(data));

      if (failUser.count === 3) {
        if (name === failUser.name) {
          setTimeout(() => exitGame());
          setFailuesr({ name: '', count: 0 });
        }
      }

      setTimeout(() => {
        startSound?.play();
      });

      setTimeout(() => {
        setTimeout(() =>
          dispatch(
            setTimer({ roundTime: data.roundTime, turnTime: data.turnTime })
          )
        );
        if (game.host === user.id) kungTurnStart(roomInfo.id as string);
      }, 4000);
    });

    return () => {
      socket.off('kung.round');
    };
  }, [
    dispatch,
    exitGame,
    failUser.count,
    failUser.name,
    game.host,
    user.id,
    roomInfo.id,
    startSound,
    user.name,
    name,
  ]);

  /**
   * Turn Logick
   */

  useEffect(() => {
    socket.on('kung.turnStart', () => {
      if (game.host === user.id) socket.emit('ping', roomInfo.id);
      dispatch(setPause(true));
      onBgm();
    });

    socket.on('kung.turnEnd', (data) => {
      dispatch(setFail());
      setTimeout(() => dispatch(clearSuccess()), 2200);
      dispatch(setGame(data));
      onFailUser(game.users[game.turn].name);
      if (game.host === user.id)
        setTimeout(() => kungRound(roomInfo.id as string), 4000);
      if (sound) sound.stop();

      turnEndSound?.play();
    });

    return () => {
      socket.off('kung.turnStart');
      socket.off('kung.turnEnd');
    };
  }, [
    dispatch,
    game.host,
    game.turn,
    game.users,
    onBgm,
    onFailUser,
    roomInfo.id,
    sound,
    turnEndSound,
    user.id,
  ]);

  /**
   * turn game Logic
   */

  useEffect(() => {
    socket.on('kung.game', (data) => {
      const { success, answer, game, message, word, who } = data;
      setTimeout(() =>
        dispatch(
          setAnswer({
            success,
            answer,
            message,
            pause: !success,
            word: word,
          })
        )
      );
      setTimeout(() => {
        dispatch(setGame(game));
      });

      if (success) {
        playAnswer({ ...word, chain: game.chain });
        sound?.pause();
        dispatch(setHistory(word));

        // Result 용 데이터
        if (word.wakta && who === user.id)
          dispatch(setResult({ type: 'WORD', word }));

        setTimeout(() => {
          setTimeout(() =>
            dispatch(
              setTurn({ roundTime: game.roundTime, turnTime: game.turnTime })
            )
          );
          if (user.id === game.host) kungTurnStart(roomInfo.id as string);
        }, 2200);
      } else {
        wrongSound?.play();
      }
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 2200);
    });

    return () => {
      socket.off('kung.game');
    };
  }, [
    answerSound,
    dispatch,
    user.id,
    playAnswer,
    roomInfo.id,
    sound,
    wrongSound,
  ]);

  /* ping logic */
  useEffect(() => {
    socket.on('ping', () => {
      if (pause) setTimeout(() => dispatch(tick()));
    });

    return () => {
      socket.off('ping');
    };
  }, [dispatch, pause, sound]);

  useEffect(() => {
    socket.on('pong', () => {
      if (game.host === user.id) kungTurnEnd(roomInfo.id as string);
      dispatch(setPause(false));
      dispatch(clearTimer());
      dispatch(clearAnswer());
    });

    return () => {
      socket.off('pong');
    };
  }, [dispatch, game.host, roomInfo.id, timer, user.id]);

  /* result, end logic*/
  useEffect(() => {
    socket.on('kung.result', async (data) => {
      try {
        dispatch(clearResult());
        dispatch(clearAnswer());
        dispatch(clearTimer());
        dispatch(clearHistory());

        dispatch(setDataModal(data));
        dispatch(openModal('RESULT'));

        let achieve: any[] = [];

        // API 호출 부분 try-catch로 감싸기
        try {
          const ach_1 =
            user.provider === 'waktaverse.games'
              ? await updatePlayCount(game.type)
              : await updatePlayCountLocal(game.type);
          if (ach_1) achieve = [...achieve, ...ach_1];
        } catch (error) {
          console.error('업적 업데이트 실패 (플레이 카운트):', error);
        }

        try {
          const ach_2 =
            user.provider === 'waktaverse.games'
              ? await updateResult(result)
              : await updateResultLocal(result);
          if (ach_2) achieve = [...achieve, ...ach_2];
        } catch (error) {
          console.error('업적 업데이트 실패 (결과):', error);
        }

        await dispatch(setAchieve(achieve));
      } catch (error) {
        console.error('결과 처리 중 오류 발생:', error);
        dispatch(closeModal());
      }
    });

    socket.on('kung.end', async (data) => {
      try {
        const { game, roomInfo } = data;

        const response = await client.get(`/user/${user.id}`);
        if (response) {
          await dispatch(setUserInfo(response.data));
        }

        await router.push('/room');
        await dispatch(setRoomInfo(roomInfo));
        await dispatch(setGame(game));
      } catch (error) {
        console.error('게임 종료 처리 중 오류 발생:', error);
        // 오류 발생 시 기본 페이지로 리다이렉트
        router.push('/');
      }
    });

    return () => {
      socket.off('kung.result');
      socket.off('kung.end');
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

  return (
    <Container>
      <Header />
      <Kung />
      <PlayerList />
      <Chat />
    </Container>
  );
};

export default Game;
