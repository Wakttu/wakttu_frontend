import { SChatBox } from '@/components';
import useInput from '@/hooks/useInput';
import { getTime } from '@/modules/Date';
import countScore from '@/modules/Score';
import { clean } from '@/modules/Slang';
import { selectAnswer, selectPause, setAnswer } from '@/redux/answer/answerSlice';
import { selectGame } from '@/redux/game/gameSlice';
import { selectRoomId } from '@/redux/roomInfo/roomInfoSlice';
import { selectTimer } from '@/redux/timer/timerSlice';
import { sendChat, socket } from '@/services/socket/socket';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userSlice, { selectUserId } from '@/redux/user/userSlice';
import { selectHistory } from '@/redux/history/historySlice';
import useEffectSound from '@/hooks/useEffectSound';
import { selectEffectVolume } from '@/redux/audio/audioSlice';
import timeScore from '@/modules/timeScore';

interface InputProps {
  chat: string;
}

export interface LogProps {
  user: any;
  chat: string;
  date: string;
}

const Chat = () => {
  const userId = useSelector(selectUserId);
  const roomId = useSelector(selectRoomId) as string;
  const game = useSelector(selectGame);
  const answer = useSelector(selectAnswer);
  const timer = useSelector(selectTimer);
  const pause = useSelector(selectPause);
  const history = useSelector(selectHistory);
  const effectVolume = useSelector(selectEffectVolume);
  const dispatch = useDispatch();


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

  const isInHistory = useCallback(
    (keyword: string) => {
      const idx = history.findIndex((item) => item.id === keyword);
      return idx === -1 ? true : false;
    },
    [history]
  );

  const onSendAnswer = useCallback(() => {
    if (inputs.chat) {
      console.log('정답 전송 시도')
      console.log(answer)
      console.log(answer.success)
      // 정답 전송
      if (Array.isArray(game.target) && game.target.includes(inputs.chat) && answer.success === false && answer.pause === false) {
        socket.emit('music.answer', { roomId: roomId, score: timeScore({
          timeLimit: timer.roundTime,
          remainingTime: timer.roundTime - timer.countTime,
        }) });
      
        dispatch(
          setAnswer({
            success: true,
            answer: inputs.chat,
            pause: true,
            word: undefined,
          })
        );
      } else {
        // 일반 메시지 전송
        sendChat({
          roomId,
          chat: clean(inputs.chat),
          roundTime: null,
          score: null,
        });
      }
    }
    setInputs({ chat: '' });
    if (inputRef.current) inputRef.current.focus();
  }, [
    game.chain,
    game.target,
    inputs.chat,
    isInHistory,
    roomId,
    setInputs,
    timer.countTime,
    timer.roundTime,
    timer.turnTime,
  ]);

  const handleEnter = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.nativeEvent.isComposing) return;
      if (e.key === 'Enter') {
        onSendAnswer();
      }
    },
    [onSendAnswer, pause]
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

  return (
    <SChatBox
      log={log}
      message={inputs.chat}
      onChange={onInputChange}
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
