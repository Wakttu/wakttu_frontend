import { styled, css } from 'goober';
import { COLORS } from '../theme';
import { R2_URL } from '@/services/api';

const DROM_SHADOW = '0px 1px 10px 0px rgba(0, 0, 0, 0.15)';

export const CMain = styled('div')`
  position: relative;
  display: flex;
  width: 120rem;
  height: 30rem;
  padding: 1.1875rem 2rem;
  justify-content: center;
  align-items: flex-start;
  gap: 2.25rem;
  flex-shrink: 0;
`;

export const CLeft = styled('div')`
  position: relative;

  width: 32.5rem;
  height: 12.5rem;
`;

export const LEye = styled('img')`
  position: absolute;
  top: 0;
  left: 2.5rem;

  width: 4.5rem;
  height: 4.5rem;
  flex-shrink: 0;

  z-index: 0;
`;
export const REye = styled('img')`
  position: absolute;
  top: 0;
  right: 2.5rem;

  width: 4.5rem;
  height: 4.5rem;
  flex-shrink: 0;

  z-index: 0;
`;

export const Mouse = styled('div')`
  display: flex;
  width: 32.5rem;
  margin-top: 3rem;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 1rem;
  border: 1rem solid #028e28;
  background: ${COLORS.bg};

  box-shadow: ${DROM_SHADOW};

  z-index: 50;
`;

export const CTag = styled('div')`
  display: flex;
  width: 19.25rem;
  padding: 0.6875rem 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-wrap: wrap;
`;

export const Tag = styled('div')<{ tag: string }>`
  display: inline-flex;
  padding: 0.375rem 0.75rem;
  align-items: center;
  gap: 0.625rem;

  border-radius: 1.875rem;
  background: ${({ tag }) => {
    switch (tag) {
      case '우왁굳':
        return '#164532';
      case '아이네':
        return '#8A2BE2';
      case '징버거':
        return '#F0A957';
      case '릴파':
        return '#2A265A';
      case '주르르':
        return '#FF008C';
      case '고세구':
        return '#00A6FF';
      case '비챤':
        return '#95C100';
      case '클래식':
      case '고멤':
        return '#05BB60';
      case '아카데미':
        return '#A72E42';
      default:
        return '#818181';
    }
  }};

  color: ${COLORS.bg};

  text-align: center;
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Target = styled('h2')`
  color: ${COLORS.text};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  animation: slideInFade 0.5s ease-out forwards;

  @keyframes slideInFade {
    from {
      opacity: 0;
      transform: translateY(1.25rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Middle = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.125rem;
`;

export const Info = styled('div')`
  display: flex;
  height: 2.9375rem;
  padding: 1.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 1rem;
  background: ${COLORS.text};
  box-shadow: ${DROM_SHADOW};
`;

export const Round = styled('h3')`
  position: absolute;
  width: 100%;

  color: ${COLORS.text};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const TimerIcon = styled('img')`
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
`;

export const CTimer = styled('div')`
  display: flex;
  width: 24.625rem;
  height: 2rem;
  justify-content: flex-end;
  align-items: center;
  gap: 0.3125rem;
`;

export const Remain = styled('h4')`
  min-width: 5rem;
  color: #00bfa3;
  text-align: right;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const TimerBar = styled('div')`
  display: flex;
  width: 19.8125rem;
  height: 1rem;

  align-items: center;

  border-radius: 6.25rem;
  background: #605774;
  box-shadow: ${DROM_SHADOW};
`;

export const GaugeBar = styled('div')<{
  gauge: number;
  pause: boolean;
}>`
  width: ${({ gauge }) => {
    const val = (30000 - gauge) / 300;
    return val + '%';
  }};
  height: 100%;
  border-radius: 6.25rem;
  background: ${COLORS.primary};
`;

export const Board = styled('div')`
  position: relative;
  width: 47.68744rem;
  height: 23.02538rem;

  background: url(${R2_URL!}/assets/game/bell-board.svg);
  background-size: cover;
`;

export const Answer = styled('div')`
  position: absolute;

  top: 6.56rem;
  left: 13.37rem;

  display: flex;
  width: 23.94613rem;
  height: 13.26725rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

export const AnswerText = styled('h2')`
  color: ${COLORS.text};
  text-align: center;
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  white-space: pre-wrap;
  word-break: break-word;
  max-width: 100%;

  opacity: 0;
  animation: fadeInUp 0.5s ease forwards;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const CRight = styled('div')`
  display: flex;
  width: 31.125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.1875rem;
  flex-shrink: 0;
`;

export const Hint = styled('div')`
  display: flex;
  max-width: 31.125rem;
  min-height: 4rem;
  padding: 0.25rem 0.625rem;
  justify-content: center;
  align-items: center;

  opacity: 0;
  transform: translateX(3.125rem);
  animation: slideIn 0.5s ease forwards;

  border-radius: 1rem;
  border: 4px solid ${COLORS.primary};
  background: ${COLORS.bg};

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(3.125rem);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const HintText = styled('h4')`
  flex: 1 0 0;

  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
