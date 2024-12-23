import { CChatInput } from '@/components';
import useInput from '@/hooks/useInput';
import countScore from '@/modules/Score';
import { clean } from '@/modules/Slang';
import { selectPause, setAnswer } from '@/redux/answer/answerSlice';
import { selectGame } from '@/redux/game/gameSlice';
import { selectRoomId } from '@/redux/roomInfo/roomInfoSlice';
import { selectTimer } from '@/redux/timer/timerSlice';
import { sendChat, socket } from '@/services/socket/socket';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface InputProps {
  chat: string;
}

const ChatInput = () => {
  const dispatch = useDispatch();
  const game = useSelector(selectGame);
  const roomId = useSelector(selectRoomId) as string;
  const timer = useSelector(selectTimer);
  const pause = useSelector(selectPause);

  const { inputs, setInputs, onInputChange } = useInput<InputProps>({
    chat: '',
  });

  const [isPenalty, setPenalty] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onSendAnswer = useCallback(() => {
    if (inputs.chat) {
      sendChat({
        roomId,
        chat: inputs.chat,
        roundTime: timer.roundTime - timer.countTime,
        score: countScore({
          wordLength: inputs.chat.length,
          chainCount: 5,
          timeLimit: timer.roundTime,
          remainingTime: timer.roundTime - timer.countTime,
        }),
      });
    }
    setInputs({ chat: '' });
    if (inputRef.current) inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, inputs.chat, roomId, timer.countTime, timer.roundTime]);

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
      if (isPenalty) return;
      if (e.nativeEvent.isComposing) return;
      if (e.key === 'Enter') {
        if (pause) onSendAnswer();
        else onSendMessage();
      }
    },
    [isPenalty, pause, onSendAnswer, onSendMessage]
  );

  useEffect(() => {
    const handlePenalty = (data: any) => {
      setPenalty(true);
      const timeoutId = setTimeout(() => {
        setPenalty(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    };

    socket.on('cloud.penalty', handlePenalty);

    return () => {
      socket.off('cloud.penalty', handlePenalty);
    };
  }, []);

  useEffect(() => {
    if (!isPenalty && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPenalty]);

  return (
    <CChatInput
      pause={pause}
      message={isPenalty ? '3초간 입력불가능!' : inputs.chat}
      inputRef={inputRef}
      onChange={onInputChange}
      onMessage={onSendMessage}
      onAnswer={onSendAnswer}
      handleEnter={handleEnter}
      isPenalty={isPenalty}
    />
  );
};

export default ChatInput;
