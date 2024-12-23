import styled, { keyframes } from 'styled-components';
import { getR2URL } from '@/services/api';
import { COLORS } from '../theme';

const clouds = [
  getR2URL('/assets/game/cloud.svg'),
  getR2URL('/assets/game/black-cloud.svg'),
  getR2URL('/assets/game/gold-cloud.svg'),
];

const floatAnimation = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0.5rem, -0.5rem); /* 약간 위로 이동 */
  }
  100% {
    transform: translate(0, 0);
  }
`;

const seguAnimation = keyframes`
from{
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const windAnimation = keyframes`
  0% {
    transform: translateX(-10%); /* 화면 왼쪽 밖에서 시작 */
  }
  100% {
    transform: translateX(110%); /* 화면 오른쪽 밖으로 이동 */
  }
`;

const goldAnimation = keyframes`
0% {
    transform: translate(0, 0);
    opacity:1;
  }
  50% {
    transform: translate(0.5rem, -0.5rem); /* 약간 위로 이동 */
    opacity:0;
  }
  100% {
    transform: translate(0, 0);
    opacity:1;
  }
`;

const goldSeguAnimation = keyframes`
0%{
  transform: rotate(0);
  opacity: 1;
}
25%{
  transform: rotate(90deg);
  opacity: 0;
}
50% {
  transform: rotate(180deg);
  opacity: 1;
}
75%{
  transform: rotate(270eg);
  opacity: 0;
}
100%{
transform: rotate(360deg);
opacity: 1;
}
`;

const goldWindAnimation = keyframes`
0% {
    transform: translateX(-10%); 
    opacity:0;
  }
  50%{
    transform: translateX(50%);
    opacity: 1;
  }
  100% {
    transform: translateX(100%); 
    opacity: 0;
  }
`;

export const Game = styled.div`
  position: relative;
  width: 82rem;
  height: 32.6875rem;
`;

export const Cloud = styled.div<{
  x: string;
  y: string;
  duration: string;
  delay: string;
  clear: boolean;
  weather?: string;
}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  width: 10.875rem;
  height: 7.4375rem;
  flex-shrink: 0;
  background-image: url(${clouds[0]});
  background-size: cover;
  left: ${(props) => props.x};
  top: ${(props) => props.y};
  animation: ${({ weather, clear }) => {
      if (clear) return 'none';
      if (weather === 'segu') return seguAnimation;
      else if (weather === 'wind') return windAnimation;
      else if (weather === 'fog') return goldAnimation;
      else return floatAnimation;
    }}
    ${(props) => props.duration} ease-in-out infinite;
  animation-delay: ${(props) => props.delay};

  opacity: ${(props) => (!props.clear ? 1 : 0)};

  z-index: 2;
  transform: ${({ weather }) =>
    weather === 'segu' ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: rotate 1s;
`;

export const BlackCloud = styled(Cloud)`
  background-image: url(${clouds[1]});

  z-index: 2;
`;

export const GoldCloud = styled(Cloud)`
  z-index: 1;

  background-image: url(${clouds[2]});
  animation: ${({ weather, clear }) => {
      if (clear) return 'none';
      if (weather === 'segu') return goldSeguAnimation;
      else if (weather === 'wind') return goldWindAnimation;
      else return goldAnimation;
    }}
    ${(props) => props.duration} ease-in-out infinite;
`;

export const CloudText = styled.h4<{ type?: number }>`
  max-width: 9.5rem;
  color: ${({ type }) => (type === 1 ? COLORS.bg : COLORS.text)};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const Ready = styled.img`
  width: 13.4375rem;
  height: 9.125rem;
  opacity: 0;
`;
