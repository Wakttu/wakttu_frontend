import { styled } from 'goober';
import { scrollbarStyles } from './Scrollbar';
import { COLORS } from '../theme';

export const List = styled('div')`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  overflow-y: scroll;

  margin-bottom: 2.5rem;
  gap: 2rem;

  ${scrollbarStyles};
`;

export const BadgeBox = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  width: 10rem;
  height: 10rem;

  border: 1px solid ${COLORS['gray-4']};
  border-radius: 1rem;
  box-sizing: border-box;

  cursor: pointer;
`;

export const Badge = styled('img')<{ got: boolean }>`
  width: 8rem;
  height: 8rem;
  flex-shrink: 0;
  position: relative;
  filter: ${({ got }) =>
    got ? 'grayscale(0)' : 'grayscale(1) brightness(0.7)'};
  border-radius: 22.5rem;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ got }) =>
      got
        ? 'transparent'
        : 'linear-gradient(180deg, rgba(128,128,128,0.6) 0%, rgba(128,128,128,0.9) 100%)'};
    border-radius: 22.5rem;
    pointer-events: none;
  }
`;

export const Hidden = styled('div')`
  width: 8rem;
  height: 8rem;
  border-radius: 22.5rem;
  background-color: black;
`;
