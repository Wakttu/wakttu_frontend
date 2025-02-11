import { styled, keyframes } from 'goober';
import { COLORS, FONT_SIZES } from '../theme';

const DROM_SHADOW = '0px 1px 10px 0px rgba(0, 0, 0, 0.15)';

const TimerAnimation = keyframes`
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
`;

export const Wrapper = styled('div')`
  position: absolute;
  top: 7.56rem;
  display: flex;
  justify-content: center;
  gap: 1.37rem;
`;

export const CInfo = styled('div')`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 42.75rem;
  padding: 0.75rem;

  gap: 0.625rem;

  border-radius: 1.875rem;
  background: ${COLORS.pupple};
  box-shadow: ${DROM_SHADOW};
`;

export const CRound = styled('div')`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const RoundText = styled('h4')<{ $type?: boolean }>`
  color: ${({ $type }) => {
    if ($type === undefined) return COLORS.bg;
    if ($type === false) return 'rgba(255, 255, 255, 0.5)';
    else return COLORS.bg;
  }};

  text-align: center;
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  ${({ $type }) => {
    return $type ? 'text-shadow: 0px 0px 4px rgba(255, 255, 255, 0.75);' : '';
  }}
`;

export const NumberText = styled('h4')`
  color: ${COLORS.pupple};

  text-align: center;
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;

export const CTarget = styled('div')`
  display: flex;
  padding: 0.625rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`;

export const TargetRound = styled('div')`
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 18.75rem;
  background: ${COLORS.bg};

  box-shadow: ${DROM_SHADOW};
`;

export const CTargetList = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`;

export const CTime = styled('div')`
  display: flex;
  padding: 0.625rem 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 1.25rem;
  background: ${COLORS.bg};
`;

export const CTimer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 38.25rem;
  height: 3.3125rem;
`;

export const TimerItem = styled('div')`
  display: flex;
  justify-content: space-between;
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
  background: #dbdbdb;

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

export const CChain = styled('div')<{ $flag?: boolean }>`
  ${({ $flag }) => {
    return $flag ? 'visibility: hidden;' : '';
  }}
  display: flex;
  width: 9.375rem;
  height: 9.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;

  border-radius: 62.5rem;
  border: 12px solid ${COLORS.pupple};
  background: ${COLORS.bg};

  box-shadow: ${DROM_SHADOW};
`;

export const CText = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ChainText = styled('h5')`
  color: ${COLORS.pupple};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;

export const BChainText = styled('h2')`
  color: ${COLORS.text};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;
