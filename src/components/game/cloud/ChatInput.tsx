import { getR2URL } from '@/services/api';
import {
  InputContainer,
  MessageBlock,
  MessageInput,
  SendIcon,
  SendMessage,
} from '@/styles/cloud/ChatInput';
import { ChangeEventHandler, RefObject } from 'react';

interface Props {
  pause: boolean;
  message: string;
  inputRef: RefObject<HTMLInputElement>;
  onChange: ChangeEventHandler;
  onMessage: () => void;
  onAnswer: () => void;
  handleEnter: (e: React.KeyboardEvent) => void;
  isPenalty: boolean;
}

const ChatInput = ({
  onChange,
  onMessage,
  onAnswer,
  handleEnter,
  message,
  pause,
  inputRef,
  isPenalty,
}: Props) => {
  return (
    <InputContainer>
      <MessageBlock>
        <MessageInput
          ref={inputRef}
          name="chat"
          value={message}
          maxLength={135}
          onChange={onChange}
          onKeyDown={handleEnter}
          onPaste={(e) => {
            e.preventDefault();
          }}
          autoComplete="off"
          disabled={isPenalty}
        />
        <SendMessage onClick={pause && !isPenalty ? onAnswer : onMessage}>
          <SendIcon src={getR2URL('/assets/icons/send.svg')} />
        </SendMessage>
      </MessageBlock>
    </InputContainer>
  );
};

export default ChatInput;
