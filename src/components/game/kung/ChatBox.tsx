import {
  ChatLog,
  CChat,
  MessageBlock,
  MessageInput,
  SendMessage,
  SendIcon,
} from '@/styles/kung/Chat';
import { KAnswer as CAnswer, KChat } from '@/components';
import { ChangeEventHandler, useEffect, RefObject, useCallback } from 'react';
import { LogProps } from '@/containers/roomlist/Chat';
import { Game } from '@/services/socket/socket';
import { Answer } from '@/redux/answer/answerSlice';
import { R2_URL } from '@/services/api';

interface Props {
  log: LogProps[];
  message: string;
  onChange: ChangeEventHandler;
  onMessage: () => void;
  onAnswer: () => void;
  handleEnter: (e: React.KeyboardEvent) => void;
  chatBoxRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  myTurn: boolean;
  game: Game;
  answer: Answer;
  pause: boolean;
  timer: any;
}

const ChatBox = ({
  log,
  message,
  onChange,
  onMessage,
  onAnswer,
  handleEnter,
  chatBoxRef,
  inputRef,
  myTurn,
  game,
  answer,
  pause,
  timer,
}: Props) => {
  const scrollToBottom = useCallback(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatBoxRef]);

  useEffect(() => {
    scrollToBottom();
  }, [log, scrollToBottom]);

  return (
    <>
      {myTurn ? (
        <CAnswer
          chat={message}
          game={game}
          timer={timer}
          answer={answer}
          pause={pause}
        />
      ) : (
        ''
      )}
      <CChat>
        <ChatLog ref={chatBoxRef}>
          {log.map((element, idx) => {
            return (
              <KChat
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
            maxLength={100}
            onChange={onChange}
            onKeyDown={handleEnter}
            onPaste={(e) => {
              e.preventDefault();
            }}
            autoComplete="off"
          />
          {pause && myTurn ? (
            <SendMessage onClick={onAnswer}>
              <SendIcon
                src={R2_URL + '/assets/icons/send.svg'}
                alt="보내기 아이콘"
              />
            </SendMessage>
          ) : (
            <SendMessage onClick={onMessage}>
              <SendIcon
                src={R2_URL + '/assets/icons/send.svg'}
                alt="보내기 아이콘"
              />
            </SendMessage>
          )}
        </MessageBlock>
      </CChat>
    </>
  );
};

export default ChatBox;
