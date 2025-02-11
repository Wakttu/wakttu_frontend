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
  width: 30rem;
  height: 31.1875rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.1875rem;
  flex-shrink: 0;
  border-radius: 1rem;
  background: transparent;

  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Log = styled('div')`
  display: flex;
  max-width: 31.125rem;
  min-height: 4rem;
  padding: 0.25rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;

  border-radius: 1rem;
  background: ${COLORS.bg};

  // 애니메이션 효과 추가
  animation: ${slideIn} 0.5s ease-in-out forwards; // 애니메이션 적용
`;

export const PlayerName = styled('h4')<{ $color?: string }>`
  display: flex;
  min-width: fit-content;
  color: ${({ $color }) => ($color ? $color : COLORS.text)};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const PlayerContent = styled('h4')`
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  word-break: break-word;
  overflow-wrap: break-word;
`;
