import styled from 'styled-components';
import { COLORS } from '../theme';

export const ChatBox = styled.div`
  display: flex;
  width: 21.25rem;
  height: 35rem;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  flex-shrink: 0;
  margin-right: 1rem;

  border-radius: 1rem;
  background: ${COLORS.bg};

  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
export const Log = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 0.625rem;
`;

export const PlayerName = styled.h5<{ $color?: string }>`
  display: flex;
  min-width: fit-content;
  color: ${({ $color }) => ($color ? $color : COLORS.text)};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const PlayerContent = styled.h5`
  flex: 1 0 0;
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  word-break: break-word;
  overflow-wrap: break-word;
`;
