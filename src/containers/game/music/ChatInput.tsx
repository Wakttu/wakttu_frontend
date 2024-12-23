import { SChatInput } from '@/components';
import { useCallback, useState, useEffect, useRef } from 'react';
import { sendChat, socket } from '@/services/socket/socket';
import timeScore from '@/modules/timeScore';
import { useDispatch } from 'react-redux';
import { selectEffectVolume } from '@/redux/audio/audioSlice';
import { selectHistory } from '@/redux/history/historySlice';
import { selectTimer } from '@/redux/timer/timerSlice';
import { selectGame } from '@/redux/game/gameSlice';
import { selectRoomId } from '@/redux/roomInfo/roomInfoSlice';
import { selectUserId } from '@/redux/user/userSlice';
import { useSelector } from 'react-redux';
import { selectAnswer, setAnswer } from '@/redux/answer/answerSlice';
import { selectPause } from '@/redux/answer/answerSlice';
import useEffectSound from '@/hooks/useEffectSound';
import useInput from '@/hooks/useInput';
import { clean } from '@/modules/Slang';
import { getTime } from '@/modules/Date';

interface InputProps {
  chat: string;
}

export interface LogProps {
  user: any;
  chat: string;
  date: string;
}

const ChatInput = () => {
  const roomId = useSelector(selectRoomId) as string;
  const game = useSelector(selectGame);
  const answer = useSelector(selectAnswer);
  const timer = useSelector(selectTimer);
  const pause = useSelector(selectPause);
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

  const inputRef = useRef<HTMLInputElement>(null);

  const playSound = useCallback(() => {
    if (logSound) {
      if (logSound.playing()) logSound.stop();
      logSound.play();
    }
  }, [logSound]);

  const onSendAnswer = useCallback(() => {
    if (inputs.chat) {
      console.log('정답 전송 시도');
      console.log(answer);
      console.log(answer.success);
      // 정답 전송
      if (
        Array.isArray(game.target) &&
        game.target.includes(inputs.chat) &&
        answer.success === false &&
        answer.pause === false
      ) {
        socket.emit('music.answer', {
          roomId: roomId,
          score: timeScore({
            timeLimit: timer.roundTime,
            remainingTime: timer.roundTime - timer.countTime,
          }),
        });

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
    answer,
    dispatch,
    game.target,
    inputs.chat,
    roomId,
    setInputs,
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
        onSendAnswer();
      }
    },
    [onSendAnswer]
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
    <SChatInput
      pause={pause}
      message={inputs.chat}
      inputRef={inputRef}
      onChange={onInputChange}
      onMessage={onSendMessage}
      onAnswer={onSendAnswer}
      handleEnter={handleEnter}
    />
  );
};

export default ChatInput;
