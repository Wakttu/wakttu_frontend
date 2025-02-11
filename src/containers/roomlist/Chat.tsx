import { ChatBox } from '@/components';
import useInput from '@/hooks/useInput';
import useEffectSound from '@/hooks/useEffectSound';
import { getTime } from '@/modules/Date';
import { clean } from '@/modules/Slang';
import { sendLobbyChat, socket } from '@/services/socket/socket';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectEffectVolume } from '@/redux/audio/audioSlice';
import { selectUserInfo } from '@/redux/user/userSlice';
import { updateStat, updateStatLocal } from '@/services/api';
import { setAchieve } from '@/redux/achieve/achieveSlice';

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
  const [log, setLog] = useState<LogProps[]>([]);
  const { inputs, setInputs, onInputChange } = useInput<InputProps>({
    chat: '',
  });
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const playSound = useCallback(() => {
    if (logSound) {
      if (logSound.playing()) logSound.stop();
      logSound.play();
    }
  }, [logSound]);

  const onSendMessage = useCallback(async () => {
    if (inputs.chat) {
      const chat = clean(inputs.chat);
      sendLobbyChat(chat);
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
  }, [dispatch, inputs.chat, setInputs, user.provider]);

  useEffect(() => {
    socket.on('alarm', (data) => {
      alert(data.message);
    });

    return () => {
      socket.off('alarm');
    };
  }, []);

  useEffect(() => {
    socket.on('lobby.chat', (data) => {
      data.date = getTime();
      setLog((prev) => [...prev, data]);
      playSound();
    });
    return () => {
      socket.off('lobby.chat');
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
