import { styled, keyframes } from 'goober';
import { COLORS } from '../theme';

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(0.625rem); }
  20% { opacity: 1; transform: translateY(0); }
  80% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-0.625rem); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-0.3rem); }
`;

const wobble = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
`;

export const Box = styled('div')<{ left?: number; right?: number }>`
  width: 12rem;
  position: absolute;
  bottom: 0;
  ${({ left, right }) => {
    if (left) return `left : ${left}rem`;
    if (right) return `right : ${right}rem`;
  }};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  z-index: 50;
`;

export const Message = styled('div')`
  display: inline-flex;
  padding: 0.5rem 1.5rem;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;

  border-radius: 0.5rem;
  background: ${COLORS.bg};

  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  animation: ${fadeInOut} 2s ease-in-out;
`;

export const Skin = styled('img')<{ width?: number }>`
  width: ${({ width }) => (width ? width + 'rem' : '4.375rem')};
  flex-shrink: 0;
  animation: ${bounce} 2s ease-in-out infinite,
    ${wobble} 3s ease-in-out infinite;
  transform-origin: bottom center;
  &:hover {
    animation: ${bounce} 0.5s ease-in-out infinite;
  }
`;
