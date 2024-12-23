import { ChatBox } from '@/components';
import useEffectSound from '@/hooks/useEffectSound';
import useInput from '@/hooks/useInput';
import { getTime } from '@/modules/Date';
import { clean } from '@/modules/Slang';
import { setAchieve } from '@/redux/achieve/achieveSlice';
import { selectEffectVolume } from '@/redux/audio/audioSlice';
import { selectHost } from '@/redux/game/gameSlice';
import { selectRoomId } from '@/redux/roomInfo/roomInfoSlice';
import { selectUserInfo } from '@/redux/user/userSlice';
import { updateStat, updateStatLocal } from '@/services/api';
import { ready, sendChat, socket } from '@/services/socket/socket';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface InputProps {
  chat: string;
}

export interface LogProps {
  user: any;
  chat: string;
  date: string;
}

const Chat = () => {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const effectVolume = useSelector(selectEffectVolume);
  const logSound = useEffectSound(
    '/assets/sound-effects/lossy/ui_click.webm',
    effectVolume
  );
  const roomId = useSelector(selectRoomId) as string;
  const host = useSelector(selectHost);
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

  const onSendMessage = useCallback(async () => {
    if (inputs.chat) {
      if (inputs.chat === '/r' && host !== user.id) {
        ready(roomId);
        setInputs({ chat: '' });
        return;
      }
      const chat = clean(inputs.chat);
      sendChat({
        roomId,
        chat: chat,
        roundTime: null,
        score: null,
      });
      setInputs({ chat: '' });
      if (chat !== inputs.chat) {
        const achieves =
          user.provider === 'waktaverse.games'
            ? await updateStat('FILTER')
            : await updateStatLocal('FILTER');
        if (achieves) dispatch(setAchieve(achieves));
      }
    }
    if (inputRef.current) inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, host, inputs.chat, roomId, user.id, user.provider]);

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
  }, [log, playSound]);

  return (
    <ChatBox
      log={log}
      message={inputs.chat}
      onChange={onInputChange}
      onClick={onSendMessage}
      inputRef={inputRef}
      chatBoxRef={chatBoxRef}
    />
  );
};

export default Chat;
