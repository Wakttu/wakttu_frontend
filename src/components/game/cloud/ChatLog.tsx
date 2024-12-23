import { LogProps } from '@/containers/game/cloud/ChatLog';
import {
  ChatBox,
  Log,
  PlayerContent,
  PlayerName,
} from '@/styles/cloud/ChatLog';
import { useCallback, useEffect, useRef } from 'react';

interface Props {
  logs: LogProps[];
}

const ChatLog = ({ logs }: Props) => {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatBoxRef]);

  useEffect(() => {
    scrollToBottom();
  }, [logs, scrollToBottom]);

  return (
    <ChatBox ref={chatBoxRef}>
      {logs.map((log: LogProps, index: number) => {
        return (
          <Log key={index}>
            <PlayerName $color={log.user.color}>{log.user.name}</PlayerName>
            <PlayerContent>{log.chat}</PlayerContent>
          </Log>
        );
      })}
    </ChatBox>
  );
};

export default ChatLog;
