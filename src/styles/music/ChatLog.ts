import styled from 'styled-components';
import { COLORS } from '../theme';

export const ChatBox = styled.div`
  display: flex;
  width: 31.25rem;
  height: 25rem;
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
export const Log = styled.div`
  display: flex;
  min-width: fit-content;
  max-width: 31.25rem;
  flex-shrink: 0;
  align-self: stretch;

  gap: 0.5rem;

  margin: 0 1rem;
  border-radius: 1rem;
  background: ${COLORS.bg};
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
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  word-break: break-word;
  overflow-wrap: break-word;
`;
