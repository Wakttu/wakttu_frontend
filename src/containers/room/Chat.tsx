import { ChatBox } from '@/components';
import useEffectSound from '@/hooks/useEffectSound';
import useInput from '@/hooks/useInput';
import { getTime } from '@/modules/Date';
import { clean } from '@/modules/Slang';
import { setAchieve } from '@/redux/achieve/achieveSlice';
import { selectEffectVolume } from '@/redux/audio/audioSlice';
import { selectRoomId } from '@/redux/roomInfo/roomInfoSlice';
import { selectUserInfo } from '@/redux/user/userSlice';
import { updateStat } from '@/services/api';
import { sendChat, socket } from '@/services/socket/socket';
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
      const chat = clean(inputs.chat);
      sendChat({
        roomId,
        chat: chat,
        roundTime: null,
        score: null,
      });
      setInputs({ chat: '' });
      if (chat !== inputs.chat && user.provider === 'waktaverse.games') {
        const achieves = await updateStat('FILTER');
        if (achieves) dispatch(setAchieve(achieves));
      }
    }
    if (inputRef.current) inputRef.current.focus();
  }, [dispatch, inputs.chat, roomId, setInputs, user.provider]);

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
