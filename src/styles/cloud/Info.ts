import styled, { keyframes, css } from 'styled-components';
import { COLORS } from '../theme';

export const InfoContainer = styled.div`
  display: flex;
  height: 35rem;
  padding: 1.5rem 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;

  border-radius: 1rem;
`;

export const Box = styled.div`
  width: 12rem;
  height: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: ${COLORS.bg};
  border-radius: 1rem;
`;

export const Text = styled.h3`
  color: ${COLORS.text};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const Weather = styled.img`
  width: 9.375rem;
`;

export const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

export const AnimatedText = styled.h3<{ isCritical: boolean }>`
  ${({ isCritical }) =>
    isCritical
      ? css`
          animation: ${blinkAnimation} 0.5s infinite;
          color: red;
        `
      : null}
`;
