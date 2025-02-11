import { styled } from 'goober';
import { COLORS, FONT_SIZES } from '../theme';

const CChat = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
  gap: 1rem;

  border: 2px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

const ChatLog = styled('div')`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  gap: 0.75rem;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLORS['gray-4']};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    box-shadow: inset 0 0 5px ${COLORS['gray-3']};
    border-radius: 4px;
    border-left: 1.5px solid transparent;
    border-right: 1.5px solid transparent;
  }
`;

const PlayerChat = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CPlayer = styled('div')`
  display: flex;
  align-items: center;
`;

const PlayerName = styled('h5')<{ $color: string }>`
  margin-left: 0.375rem;
  color: ${({ $color }) => $color};
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  white-space: nowrap;
`;

const PlayerIcon = styled('img')`
  width: 1.125rem;
  height: 1.125rem;
  min-width: 1.125rem;
`;

const ChatContent = styled('h6')`
  align-self: flex-end;
  max-width: 90%;
  margin-left: 0.625rem;

  color: ${COLORS.text};
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
`;

const DateContent = styled('h6')`
  display: inline-block;

  white-space: nowrap;
  margin-right: 1.5rem;

  color: ${COLORS.text};
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
`;

const MessageBlock = styled('div')`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  border-radius: 5.1875rem;
  border: 1px solid ${COLORS['gray-4']};
  background: ${COLORS['gray-5']};
`;

const MessageInput = styled('input')`
  display: -webkit-box;
  width: 100%;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  border: none;
  background: ${COLORS['gray-5']};

  overflow: hidden;
  color: ${COLORS.text};
  text-overflow: ellipsis;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: ${FONT_SIZES['body-1']};
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:focus {
    outline: none;
  }
`;

const SendMessage = styled('button')`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;
  border: none;
  background: ${COLORS.primary};

  cursor: pointer;
`;

const SendIcon = styled('img')`
  fill: ${COLORS.bg};
  width: 1.1004rem;
  height: 1.1004rem;
`;
export {
  CChat,
  ChatLog,
  PlayerChat,
  CPlayer,
  PlayerIcon,
  PlayerName,
  ChatContent,
  DateContent,
  MessageBlock,
  MessageInput,
  SendMessage,
  SendIcon,
};
