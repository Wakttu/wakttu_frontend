import { styled, keyframes } from 'goober';

const motion = keyframes`
0% {
  transform: translateY(0);
}
25% {
  transform: translateY(-2rem);
}
50% {
  transform: translateY(0);
}
75%{
    transform: translateY(+2rem);
}
100% {
  transform: translateY(0);
}
`;

export const Container = styled('div')`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1500;
`;

export const Logo = styled('img')`
  width: 32rem;
  height: 32rem;

  animation: ${motion} 1s linear infinite;
`;

export const Title = styled('h2')``;
