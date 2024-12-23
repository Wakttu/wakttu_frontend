import { BChatBox } from '@/components';
import useInput from '@/hooks/useInput';
import { getTime } from '@/modules/Date';
import countScore from '@/modules/Score';
import { clean } from '@/modules/Slang';
import {
  selectAnswer,
  selectPause,
  setAnswer,
} from '@/redux/answer/answerSlice';
import { selectGame } from '@/redux/game/gameSlice';
import { selectRoomId } from '@/redux/roomInfo/roomInfoSlice';
import { selectTimer } from '@/redux/timer/timerSlice';
import { sendChat, socket } from '@/services/socket/socket';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useEffectSound from '@/hooks/useEffectSound';
import { selectEffectVolume } from '@/redux/audio/audioSlice';

interface InputProps {
  chat: string;
}

export interface LogProps {
  user: any;
  chat: string;
  date: string;
}

const Chat = () => {
  const roomId = useSelector(selectRoomId) as string;
  const game = useSelector(selectGame);
  const answer = useSelector(selectAnswer);
  const timer = useSelector(selectTimer);
  const pause = useSelector(selectPause);
  const effectVolume = useSelector(selectEffectVolume);
  const dispatch = useDispatch();

  const [myTurn, setMyTurn] = useState(false);

  const logSound = useEffectSound(
    '/assets/sound-effects/lossy/ui_click.webm',
    effectVolume
  );
  const [log, setLog] = useState<LogProps[]>([]);

  const { inputs, setInputs, onInputChange } = useInput<InputProps>({
    chat: '',
  });

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const playSound = useCallback(() => {
    if (logSound) {
      if (logSound.playing()) logSound.stop();
      logSound.play();
    }
  }, [logSound]);

  const onSendAnswer = useCallback(() => {
    if (inputs.chat) {
      if (inputs.chat !== game.target || !myTurn) {
        sendChat({
          roomId,
          chat: clean(inputs.chat),
          roundTime: null,
          score: null,
        });
      } else {
        sendChat({
          roomId,
          chat: inputs.chat,
          roundTime: timer.roundTime - timer.countTime,
          score: countScore({
            wordLength: inputs.chat.length,
            chainCount: 1,
            timeLimit: timer.roundTime,
            remainingTime: timer.roundTime - timer.countTime,
          }),
          success: true,
        });
        dispatch(
          setAnswer({
            success: true,
            answer: inputs.chat,
            pause: false,
            word: undefined,
          })
        );
        setMyTurn(false);
      }
    }
    setInputs({ chat: '' });
    if (inputRef.current) inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    game.target,
    inputs.chat,
    myTurn,
    roomId,
    timer.countTime,
    timer.roundTime,
  ]);

  const onSendMessage = useCallback(() => {
    if (inputs.chat) {
      const chat = clean(inputs.chat);
      sendChat({
        roomId,
        chat: chat.includes(game.target)
          ? '전투***가 정답을 가로챘습니다.'
          : chat,
        roundTime: null,
        score: null,
      });
    }
    setInputs({ chat: '' });
    if (inputRef.current) inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.target, inputs.chat, roomId]);

  const handleEnter = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.nativeEvent.isComposing) return;
      if (e.key === 'Enter') {
        if (pause && myTurn) onSendAnswer();
        else onSendMessage();
      }
    },
    [pause, myTurn, onSendAnswer, onSendMessage]
  );

  useEffect(() => {
    socket.on('alarm', (data) => {
      alert(data.message);
    });

    return () => {
      socket.off('alarm');
    };
  }, []);

  useEffect(() => {
    socket.on('chat', (data) => {
      data.date = getTime();
      setLog((prev) => [...prev, data]);
      playSound();
    });
    return () => {
      socket.off('chat');
    };
  }, [log]);

  useEffect(() => {
    if (pause) {
      setMyTurn(true);
    } else {
      setMyTurn(false);
    }
  }, [pause]);

  return (
    <BChatBox
      log={log}
      message={inputs.chat}
      onChange={onInputChange}
      onMessage={onSendMessage}
      onAnswer={onSendAnswer}
      handleEnter={handleEnter}
      inputRef={inputRef}
      chatBoxRef={chatBoxRef}
      game={game}
      answer={answer}
      timer={timer}
      pause={pause}
    />
  );
};

export default Chat;
