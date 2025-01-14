import { Container } from '@/styles/last/Layout';
import PlayerList from '@/containers/game/last/PlayerList';
import Chat from '@/containers/game/last/Chat';
import Header from '@/containers/game/last/Header';
import Info from '@/containers/game/last/Info';
import Last from '@/containers/game/last/Last';
import { useDispatch, useSelector } from 'react-redux';
import { clearGame, selectGame, setGame } from '@/redux/game/gameSlice';
import {
  exit,
  lastRound,
  lastTurnEnd,
  lastTurnStart,
  sendBotChat,
  sendEmoticon,
  socket,
} from '@/services/socket/socket';
import {
  clearRoomInfo,
  selectRoomInfo,
  setRoomInfo,
} from '@/redux/roomInfo/roomInfoSlice';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  clearAnswer,
  clearSuccess,
  selectPause,
  setAnswer,
  setFail,
  setPause,
} from '@/redux/answer/answerSlice';
import {
  clearTimer,
  selectTimer,
  setTimer,
  setTurn,
  tick,
} from '@/redux/timer/timerSlice';
import {
  selectEmoticon,
  selectUserInfo,
  selectUserName,
  setUserInfo,
} from '@/redux/user/userSlice';
import { useRouter } from 'next/router';
import { clearHistory, setHistory } from '@/redux/history/historySlice';
import useSound from '@/hooks/useSound';
import useEffectSound from '@/hooks/useEffectSound';
import useWaktaSound from '@/hooks/useWaktaSound';
import { GetKey } from '@/modules/Voice';
import { client } from '@/services/api';
import useAnswerSound from '@/hooks/useAnswerSound';
import { selectVolume } from '@/redux/audio/audioSlice';
import { selectResult } from '@/redux/result/resultSlice';
import { closeModal, openModal, setDataModal } from '@/redux/modal/modalSlice';
import { setAchieve } from '@/redux/achieve/achieveSlice';

const Game = () => {
  /** Redux and State Part */
  const dispatch = useDispatch();
  const router = useRouter();
  const game = useSelector(selectGame);
  const name = useSelector(selectUserName);
  const roomInfo = useSelector(selectRoomInfo);
  const user = useSelector(selectUserInfo);
  const timer = useSelector(selectTimer);
  const pause = useSelector(selectPause);
  const emoticonId = useSelector(selectEmoticon);

  const { bgmVolume, effectVolume, voiceVolume } = useSelector(selectVolume);

  const [isBotTurn, setIsBotTurn] = useState(false);

  /**
   * Sound Part
   */
  const sound = useSound(
    '/assets/bgm/lossy/ui_in-game.webm',
    bgmVolume,
    0,
    true
  );
  const fastSound = useSound(
    '/assets/bgm/lossy/ui_in-game_speedup.webm',
    bgmVolume,
    0,
    true
  );

  const startSound = useEffectSound(
    '/assets/sound-effects/lossy/game_start.webm',
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

  const answerSound = useAnswerSound(effectVolume);

  const waktaSound = useWaktaSound(voiceVolume);

  const emoticonRef = useRef(0);

  /** Function Part*/

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

  // Turn 시작시 BGM 켜는 함수
  const onBgm = useCallback(() => {
    if (game.chain >= 10 || timer.turnTime - timer.countTime <= 10000) {
      if (fastSound && !fastSound.playing()) {
        if (sound && sound.playing()) sound.stop();
        fastSound.play();
      }
    } else if (game.chain < 10 || timer.turnTime - timer.countTime > 10000) {
      if (sound && !sound.playing()) {
        if (fastSound && !fastSound.playing()) fastSound.stop();
        sound.play();
      }
    }
  }, [fastSound, game.chain, sound, timer.countTime, timer.turnTime]);

  const exitGame = useCallback(async () => {
    await router.push('/roomlist');
    await dispatch(clearRoomInfo());
    await dispatch(clearGame());
    exit(roomInfo.id as string);
  }, [dispatch, roomInfo.id, router]);

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
      answerSound![id.length < 10 ? id.length - 2 : 9].play();
      if (wakta) {
        const key = GetKey(type, meta);
        setTimeout(() => waktaSound![key].play(), 500);
      }
    },
    [answerSound, waktaSound]
  );

  /* round 종료시 history 없애기*/
  useEffect(() => {
    dispatch(clearHistory());
  }, [dispatch, game.round]);

  /* round logic */
  useEffect(() => {
    socket.on('last.round', (data) => {
      dispatch(setGame(data));

      setTimeout(() => {
        startSound?.play();
      });

      setTimeout(() => {
        setTimeout(() =>
          dispatch(
            setTimer({ roundTime: data.roundTime, turnTime: data.turnTime })
          )
        );
        if (game.host === user.id) lastTurnStart(roomInfo.id as string);
      }, 4000);
    });

    return () => {
      socket.off('last.round');
    };
  }, [
    dispatch,
    exitGame,
    game.host,
    user.id,
    roomInfo.id,
    sound,
    startSound,
    name,
  ]);

  useEffect(() => {
    if (isBotTurn) {
      // Bot 턴일 때 서버에 답변 요청
      socket.emit('last.getAnswer', roomInfo.id!);
    }
  }, [isBotTurn, roomInfo.id]); // isBotTurn이 변경될 때마다 실행

  /* turn Logic */
  useEffect(() => {
    socket.on('last.turnStart', () => {
      if (game.host === user.id) socket.emit('ping', roomInfo.id);
      setIsBotTurn(game.users[game.turn].provider === 'bot');
      dispatch(setPause(true));
      onBgm();
    });

    socket.on('last.turnEnd', (data) => {
      if (!isBotTurn) sendBotChat({ roomId: roomInfo.id!, type: 0 });

      setIsBotTurn(false);

      dispatch(setFail());
      dispatch(setGame(data));
      setTimeout(() => dispatch(clearSuccess()), 2200);
      if (game.host === user.id)
        setTimeout(() => lastRound(roomInfo.id as string), 4000);
      if (sound) sound.stop();
      if (fastSound) fastSound.stop();
      turnEndSound?.play();
    });
    return () => {
      socket.off('last.turnStart');
      socket.off('last.turnEnd');
    };
  }, [
    dispatch,
    fastSound,
    game.host,
    game.turn,
    game.users,
    isBotTurn,
    onBgm,
    roomInfo.id,
    sound,
    turnEndSound,
    user.id,
  ]);

  /* turn game logic */
  useEffect(() => {
    socket.on('last.game', (data) => {
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
        fastSound?.pause();
        dispatch(setHistory(word));

        setTimeout(() => {
          setTimeout(() => {
            dispatch(
              setTurn({ roundTime: game.roundTime, turnTime: game.turnTime })
            );
            setIsBotTurn(false);
          });

          if (user.id === game.host) lastTurnStart(roomInfo.id as string);
        }, 2200);
      } else {
        wrongSound?.play();
        if (isBotTurn) socket.emit('last.getAnswer', roomInfo.id!);
      }
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 2200);
    });

    return () => {
      socket.off('last.game');
    };
  }, [
    answerSound,
    dispatch,
    fastSound,
    roomInfo.id,
    sound,
    wrongSound,
    playAnswer,
    user.id,
    isBotTurn,
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
      if (game.host === user.id) lastTurnEnd(roomInfo.id as string);
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
    socket.on('last.result', async (data) => {
      try {
        dispatch(clearAnswer());
        dispatch(clearTimer());
        dispatch(clearHistory());
      } catch (error) {
        console.error('결과 처리 중 오류 발생:', error);
        dispatch(closeModal());
      }
    });

    socket.on('last.end', async (data) => {
      try {
        const { game, roomInfo } = data;

        const response = await client.get(`/user/${user.id}`);
        if (response) await dispatch(setUserInfo(response.data));

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
      socket.off('last.result');
      socket.off('last.end');
    };
  }, [dispatch, router, user.id]);

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
      <Info />
      <Last />
      <PlayerList />
      <Chat />
    </Container>
  );
};

export default Game;
