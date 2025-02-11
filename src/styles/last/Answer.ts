import { keyframes, styled } from 'goober';
import { COLORS, FONT_SIZES } from '../theme';

const DROM_SHADOW = '0px 1px 10px 0px rgba(0, 0, 0, 0.15)';

const TimerAnimation = keyframes`
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
`;

export const Container = styled('div')<{ pause: boolean }>`
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  height: 35.8rem;
  padding: 8.875rem 39.8125rem 8.8125rem 39.8125rem;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: ${({ pause }) => (pause ? 1000 : -1000)};

  opacity: ${({ pause }) => (pause ? 1 : 0)};
`;

export const Modal = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40.375rem;
  height: 18.6875rem;
  flex-shrink: 0;

  border-radius: 1.875rem;
  border: 4px solid ${COLORS.pupple};
  background: #e7e7e7;

  box-shadow: ${DROM_SHADOW};
`;

export const ModalTitle = styled('div')`
  display: inline-flex;
  width: 100%;
  padding: 0.9375rem 0 0.625rem 0;
  justify-content: center;
  align-items: center;

  border-radius: 1.875rem 1.875rem 0rem 0rem;
  background: ${COLORS.pupple};
`;

export const TitleText = styled('h4')`
  color: ${COLORS.bg};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;

export const TargetText = styled('h2')`
  margin-top: 1.19rem;
  color: ${COLORS.text};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 700;
`;

export const CTimer = styled('div')`
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  gap: 0.3125rem;
`;

export const LeftTimer = styled('div')`
  display: inline-flex;
  align-items: center;
  gap: 0.3125rem;
`;
export const RightTimer = styled('div')`
  display: inline-flex;
  align-items: center;
  gap: 0.3125rem;
`;

export const TimerIcon = styled('img')`
  width: 1.5rem;
  height: 1.5rem;
`;

export const TimerText = styled('span')`
  color: #747474;
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: ${FONT_SIZES['body-2']};
`;

export const RemainText = styled('span')`
  color: ${COLORS.pupple};
  text-align: right;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: ${FONT_SIZES['body-2']};
`;

export const TimerBar = styled('div')`
  display: flex;
  width: 26.125rem;
  height: 0.625rem;

  align-items: center;

  border-radius: 6.25rem;
  background: ${COLORS['gray-5']};

  box-shadow: ${DROM_SHADOW};
`;

export const BTimerBar = styled(TimerBar)`
  background: #605774;
`;

export const GaugeBar = styled('div')<{ gauge: number; pause: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 6.25rem;
  background: ${COLORS.pupple};
  transform-origin: left;
  will-change: transform;

  animation: ${({ pause }) => (pause ? TimerAnimation : 'none')}
    ${({ gauge }) => gauge * 1.1}ms linear;
  animation-play-state: ${({ pause }) => (pause ? 'running' : 'paused')};
  animation-fill-mode: forwards;
`;

export const CAnswer = styled('div')`
  display: flex;
  width: 36.25rem;
  height: 4.0625rem;
  padding: 0.8125rem 0rem 0.875rem 0rem;
  margin-top: 1.19rem;
  justify-content: center;
  align-items: center;

  border-radius: 6.25rem;
  border: 2px solid #d7d7d7;
  background: ${COLORS.bg};
`;

export const AnswerText = styled('h3')`
  color: #727272;
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;
