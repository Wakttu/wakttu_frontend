import {
  ChatLog,
  CChat,
  MessageBlock,
  MessageInput,
  SendMessage,
  SendIcon,
} from '@/styles/common/Chat';
import { Chat } from '@/components';
import {
  ChangeEventHandler,
  useEffect,
  KeyboardEvent,
  RefObject,
  useCallback,
} from 'react';
import { LogProps } from '@/containers/roomlist/Chat';
import { R2_URL } from '@/services/api';

interface Props {
  log: LogProps[];
  message: string;
  onChange: ChangeEventHandler;
  onClick: () => void;
  chatBoxRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
}

const ChatBox = ({
  log,
  message,
  onChange,
  onClick,
  chatBoxRef,
  inputRef,
}: Props) => {
  const scrollToBottom = useCallback(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatBoxRef]);

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.nativeEvent.isComposing) return;
      if (e.key === 'Enter') {
        onClick();
      }
    },
    [onClick]
  );

  useEffect(() => {
    scrollToBottom();
  }, [log, scrollToBottom]);

  return (
    <CChat>
      <ChatLog ref={chatBoxRef}>
        {log.map((element, idx) => {
          return (
            <Chat
              key={idx}
              user={element.user}
              chat={element.chat}
              date={element.date}
            />
          );
        })}
      </ChatLog>
      <MessageBlock>
        <MessageInput
          ref={inputRef}
          name="chat"
          value={message}
          maxLength={80}
          onChange={onChange}
          onKeyDown={handleEnter}
          autoComplete="off"
        />
        <SendMessage onClick={onClick}>
          <SendIcon
            src={R2_URL + '/assets/icons/send.svg'}
            alt="보내기 아이콘"
          />
        </SendMessage>
      </MessageBlock>
    </CChat>
  );
};

export default ChatBox;
