import { CChatLog } from '@/components';
import useEffectSound from '@/hooks/useEffectSound';
import { clean } from '@/modules/Slang';
import { selectEffectVolume } from '@/redux/audio/audioSlice';
import { socket } from '@/services/socket/socket';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface LogProps {
  user: any;
  chat: string;
}

const ChatLog = () => {
  const [log, setLog] = useState<LogProps[]>([]);
  const effectVolume = useSelector(selectEffectVolume);

  const logSound = useEffectSound(
    '/assets/sound-effects/lossy/ui_click.webm',
    effectVolume
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
    const handleChatLog = (data: LogProps) => {
      const _data = { ...data, chat: clean(data.chat) };
      setLog((prev) => [...prev, _data]);
      logSound?.play();
    };

    socket.on('chat', handleChatLog);

    return () => {
      socket.off('chat', handleChatLog);
    };
  }, [logSound]);

  return <CChatLog logs={log} />;
};

export default ChatLog;
