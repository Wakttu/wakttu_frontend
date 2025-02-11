import { styled, css, keyframes } from 'goober';

const typingAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fontSizeAnimation = keyframes`
  50% {
    font-size: 2.5rem;
  }
  100% {
    font-size: 1.5rem;
  }
`;

const textDecorationEffect = keyframes`
  50% {
    text-decoration: line-through;
  }
  100% {
    text-decoration: line-through;
  }
`;

const TypingContainer = styled('div')`
  position: absolute;

  z-index: 2;
  display: inherit;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  font: inherit;
  color: inherit;
  justify-content: center;
`;

const TypingSpan = styled('span')<{ isTyped: boolean }>`
  white-space: nowrap;
  font: inherit;
  color: inherit;

  ${({ isTyped }) =>
    isTyped
      ? css`
          animation: ${typingAnimation} 1s ease forwards,
            ${fontSizeAnimation} 0.01s;
        `
      : 'none'};
`;

const TypingWrong = styled('span')`
  width: 100%;
  text-overflow: ellipsis;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;

  color: #ff385c;
  animation: ${textDecorationEffect} 0.7s step-end 3 forwards;
`;

const EndText = styled('div')<{ end: boolean }>`
  position: absolute;

  z-index: 1;
  opacity: ${({ end }) => (end ? 1 : 0)};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
  font: inherit;
  color: inherit;
`;

export { TypingContainer, TypingSpan, TypingWrong, EndText };
