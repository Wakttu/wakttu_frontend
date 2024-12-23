import { GChatBox } from '@/components';
import useInput from '@/hooks/useInput';
import { getTime } from '@/modules/Date';
import countScore from '@/modules/Score';
import { clean } from '@/modules/Slang';
import { selectAnswer, selectPause } from '@/redux/answer/answerSlice';
import { selectGame } from '@/redux/game/gameSlice';
import { selectRoomId } from '@/redux/roomInfo/roomInfoSlice';
import { selectTimer } from '@/redux/timer/timerSlice';
import { sendChat, socket } from '@/services/socket/socket';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import wordRelay from '@/modules/WordRelay';
import userSlice, { selectUserId } from '@/redux/user/userSlice';
import { selectHistory } from '@/redux/history/historySlice';
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
  const userId = useSelector(selectUserId);
  const roomId = useSelector(selectRoomId) as string;
  const game = useSelector(selectGame);
  const answer = useSelector(selectAnswer);
  const timer = useSelector(selectTimer);
  const pause = useSelector(selectPause);
  const history = useSelector(selectHistory);
  const effectVolume = useSelector(selectEffectVolume);
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

  const isInHistory = useCallback(
    (keyword: string) => {
      const idx = history.findIndex((item) => item.id === keyword);
      return idx === -1 ? true : false;
    },
    [history]
  );

  const onSendAnswer = useCallback(() => {
    if (inputs.chat) {
      const { isValid, message } = wordRelay(game.target, inputs.chat);
      const isIn = isInHistory(inputs.chat);

      sendChat({
        roomId,
        chat: inputs.chat,
        roundTime: timer.roundTime - timer.countTime,
        score: countScore({
          wordLength: inputs.chat.length,
          chainCount: game.chain,
          timeLimit: timer.turnTime,
          remainingTime: timer.turnTime - timer.countTime,
        }),
        success: !isValid || !isIn,
      });
    }
    setInputs({ chat: '' });
    if (inputRef.current) inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    game.chain,
    game.target,
    inputs.chat,
    isInHistory,
    roomId,
    timer.countTime,
    timer.roundTime,
    timer.turnTime,
  ]);

  const onSendMessage = useCallback(() => {
    if (inputs.chat) {
      sendChat({
        roomId,
        chat: clean(inputs.chat),
        roundTime: null,
        score: null,
      });
    }
    setInputs({ chat: '' });
    if (inputRef.current) inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs.chat, roomId]);

  const handleEnter = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.nativeEvent.isComposing) return;
      if (e.key === 'Enter') {
        if (myTurn && pause) onSendAnswer();
        else onSendMessage();
      }
    },
    [myTurn, onSendAnswer, onSendMessage, pause]
  );

  useEffect(() => {
    const isValidTurn =
      game.users.length > 0 && game.turn >= 0 && game.turn < game.users.length;
    setMyTurn(isValidTurn ? game.users[game.turn].userId === userId : false);
  }, [game.turn, game.users, userId]);

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
    <GChatBox
      log={log}
      message={inputs.chat}
      onChange={onInputChange}
      onMessage={onSendMessage}
      onAnswer={onSendAnswer}
      handleEnter={handleEnter}
      inputRef={inputRef}
      chatBoxRef={chatBoxRef}
      myTurn={myTurn}
      game={game}
      answer={answer}
      timer={timer}
      pause={pause}
    />
  );
};

export default Chat;
