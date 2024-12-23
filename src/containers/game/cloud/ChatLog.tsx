import { CChatLog } from '@/components';
import { clean } from '@/modules/Slang';
import { socket } from '@/services/socket/socket';
import { useEffect, useState } from 'react';

export interface LogProps {
  user: any;
  chat: string;
}

const ChatLog = () => {
  const [log, setLog] = useState<LogProps[]>([]);

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
    };

    socket.on('chat', handleChatLog);

    return () => {
      socket.off('chat', handleChatLog);
    };
  }, []);

  return <CChatLog logs={log} />;
};

export default ChatLog;
