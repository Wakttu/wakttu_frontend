import styled, { keyframes } from 'styled-components';
import { COLORS } from '../theme';

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
`;
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
`;

export const Content = styled.div<{ weather?: string }>`
  position: relative;
  display: flex;
  width: 30rem;
  padding: 1rem 0rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  overflow: hidden;

  border-radius: 1rem;
  background: ${({ weather }) =>
    weather === 'segu'
      ? 'linear-gradient(180deg, #FFA2A2 0%, #996161 100%)'
      : '#60d4d6'};
`;

export const CTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`;

export const TitleImg = styled.img`
  width: 3rem;
  height: 3rem;
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-0.625rem);
  }
  60% {
    transform: translateY(-0.3125rem);
  }
`;

const warning = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const Title = styled.div<{ weather?: string }>`
  display: flex;
  span {
    color: ${COLORS.text};
    text-align: center;

    font-family: 'Wanted Sans Variable', sans-serif;
    font-size: 2rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    animation: ${({ weather }) => (weather === 'segu' ? warning : bounce)} 1s
      infinite;
  }
`;

export const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26.25rem;
  height: 15.75rem;

  border-radius: 1rem;
  background: ${COLORS.bg};
`;

export const Weather = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`;
export const WeatherImg = styled.img`
  width: 11.25rem;
  height: 8.99994rem;
  flex-shrink: 0;
  animation: ${pulse} 1.5s infinite;
`;

export const WeatherText = styled.h3`
  color: ${COLORS.text};
  text-align: center;

  font-family: 'Wanted Sans Variable', sans-serif;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
