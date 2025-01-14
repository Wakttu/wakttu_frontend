import { GChatBox } from '@/components';
import useInput from '@/hooks/useInput';
import { getTime } from '@/modules/Date';
import countScore from '@/modules/Score';
import { clean } from '@/modules/Slang';
import { selectAnswer, selectPause } from '@/redux/answer/answerSlice';
import { selectGame } from '@/redux/game/gameSlice';
import { selectRoomId } from '@/redux/roomInfo/roomInfoSlice';
import { selectTimer } from '@/redux/timer/timerSlice';
import {
  sendBotAnswer,
  sendBotChat,
  sendChat,
  socket,
} from '@/services/socket/socket';
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
    const handleChat = (data: any) => {
      data.date = getTime();
      setLog((prev) => [...prev, data]);
      playSound();
    };

    socket.on('chat', handleChat);
    return () => {
      socket.off('chat', handleChat);
    };
  }, [log, playSound]);

  // 서버로부터 답변을 받을 때의 처리
  useEffect(() => {
    const handleGetAnswer = (data: any) => {
      if (!data) {
        sendBotChat({ roomId, type: 2 });
        return;
      }
      const { isValid, message } = wordRelay(game.target, data);
      const isIn = isInHistory(data);

      const remainingTime = timer.turnTime - timer.countTime;
      const delay = remainingTime >= 5000 ? 2000 : Math.min(remainingTime, 500);
      if (remainingTime - delay < 200) return;
      const timeoutId = setTimeout(() => {
        sendBotAnswer({
          roomId,
          chat: data,
          roundTime: timer.roundTime - timer.countTime - delay,
          score: countScore({
            wordLength: data.length,
            chainCount: game.chain,
            timeLimit: timer.turnTime,
            remainingTime: timer.turnTime - timer.countTime - delay,
          }),
          success: !isValid || !isIn,
        });
      }, delay);

      // 컴포넌트 언마운트 시 타이머 정리
      return () => clearTimeout(timeoutId);
    };

    socket.on('last.getAnswer', handleGetAnswer);

    return () => {
      socket.off('last.getAnswer', handleGetAnswer);
    };
  }, [
    game.chain,
    game.target,
    isInHistory,
    roomId,
    timer.countTime,
    timer.roundTime,
    timer.turnTime,
  ]); // dispatch가 변경될 때마다 실행

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
