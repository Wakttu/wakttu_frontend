import { SChatInput } from '@/components';
import { useCallback, useRef } from 'react';
import { sendChat, socket } from '@/services/socket/socket';
import timeScore from '@/modules/timeScore';
import { useDispatch } from 'react-redux';
import { selectEffectVolume } from '@/redux/audio/audioSlice';
import { selectTimer } from '@/redux/timer/timerSlice';
import { selectGame } from '@/redux/game/gameSlice';
import { selectRoomId } from '@/redux/roomInfo/roomInfoSlice';
import { useSelector } from 'react-redux';
import { selectAnswer, setAnswer } from '@/redux/answer/answerSlice';
import { selectPause } from '@/redux/answer/answerSlice';
import useInput from '@/hooks/useInput';
import { clean } from '@/modules/Slang';

interface InputProps {
  chat: string;
}

const ChatInput = () => {
  const roomId = useSelector(selectRoomId) as string;
  const game = useSelector(selectGame);
  const answer = useSelector(selectAnswer);
  const timer = useSelector(selectTimer);
  const pause = useSelector(selectPause);
  const effectVolume = useSelector(selectEffectVolume);
  const dispatch = useDispatch();

  const { inputs, setInputs, onInputChange } = useInput<InputProps>({
    chat: '',
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const onSendAnswer = useCallback(() => {
    if (inputs.chat) {
      const chat = inputs.chat.toLowerCase().replace(/ /g, '');

      if (chat === '!p') {
        socket.emit('music.command', { roomId, chat });
        setInputs({ chat: '' });
        if (inputRef.current) inputRef.current.focus();
        return;
      }
      // 정답 전송
      if (
        Array.isArray(game.target) &&
        game.target.includes(chat) &&
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

  const handleEnter = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.nativeEvent.isComposing) return;
      if (e.key === 'Enter') {
        onSendAnswer();
      }
    },
    [onSendAnswer]
  );

  return (
    <SChatInput
      pause={pause}
      message={inputs.chat}
      inputRef={inputRef}
      onChange={onInputChange}
      onAnswer={onSendAnswer}
      handleEnter={handleEnter}
    />
  );
};

export default ChatInput;
