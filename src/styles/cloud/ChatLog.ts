import { styled, keyframes } from 'goober';
import { COLORS } from '../theme';

// 애니메이션 정의
const slideIn = keyframes`
  from {
    transform: translateY(0.625rem); // 아래에서 시작
  }
  to {
    transform: translateY(0); // 원래 위치로 이동
  }
`;

export const ChatBox = styled('div')`
  display: flex;
  width: 21.25rem;
  height: 35rem;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  flex-shrink: 0;

  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
export const Log = styled('div')`
  display: flex;
  min-width: fit-content;
  max-width: 21.25rem;
  flex-shrink: 0;
  align-self: stretch;
  gap: 0.625rem;

  padding: 1rem;
  border-radius: 1rem;
  background: ${COLORS.bg};

  animation: ${slideIn} 0.3s ease-in-out forwards; // 애니메이션 적용
`;

export const PlayerName = styled('h5')<{ $color?: string }>`
  display: flex;
  min-width: fit-content;
  color: ${({ $color }) => ($color ? $color : COLORS.text)};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const PlayerContent = styled('h5')`
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  word-break: break-word;
  overflow-wrap: break-word;
`;
