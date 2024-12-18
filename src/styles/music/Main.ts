import styled, { css } from 'styled-components';
import { COLORS, FONT_SIZES } from '../theme';
import { R2_URL } from '@/services/api';

const DROM_SHADOW = '0px 1px 10px 0px rgba(0, 0, 0, 0.15)';

export const CMain = styled.div`
  position: relative;
  display: flex;
  width: 120rem;
  height: 30rem;
  padding: 1.1875rem 2rem;
  justify-content: center;
  align-items: center;
  gap: 2.25rem;
  flex-shrink: 0;
`;

export const SLeft = styled.div`
  position: relative;

  width: 30rem;
`;

export const LEye = styled.img`
  position: absolute;
  top: 0;
  left: 2.5rem;

  width: 4.5rem;
  height: 4.5rem;
  flex-shrink: 0;

  z-index: 0;
`;
export const REye = styled.img`
  position: absolute;
  top: 0;
  right: 2.5rem;

  width: 4.5rem;
  height: 4.5rem;
  flex-shrink: 0;

  z-index: 0;
`;

export const Mouse = styled.div`
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

export const CTag = styled.div`
  display: flex;
  width: 19.25rem;
  padding: 0.6875rem 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-wrap: wrap;
`;

export const Tag = styled.div<{ tag: string }>`
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

export const Target = styled.h2`
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

export const TimerOverlay = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 2rem;
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  z-index: 10;
  display: ${props => props.$isVisible ? 'none' : 'block'};
`;

export const Middle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 640px;
  height: 380px;
  border-radius: 16px;
  border: 1px solid #000;
  background: #FFF;
`;

export const YoutubeWrapper = styled.div`
  width: 560px;
  height: 315px;
`;

export const Info = styled.div`
  display: flex;
  height: 2.9375rem;
  padding: 1.5rem 1rem;
  justify-content: center;
  align-items: center;

  border-radius: 1rem;
  background: ${COLORS.text};
  box-shadow: ${DROM_SHADOW};
`;

export const Song = styled.div`
  display: flex;
  height: 2.9375rem;
  padding-top: 0.8rem;
  justify-content: left;
  align-items: center;
  gap: 0.625rem;

  width: 560px;

  border-radius: 1rem;
`;

export const VideoScreen = styled.div<{ $isVisible: boolean }>`
  width: 560px;
  height: 315px;
  position: relative;
  background-color: #000;
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};

  & > div:first-child {
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transition: opacity 0.15s ease;
  }
`;

export const SongIcon = styled.div`
  width: 43px;
  height: 42px;
  flex-shrink: 0;

  background: #D9D9D9;
  border-radius: 43px;
`;

export const SongText = styled.div<{ $isVisible: boolean }>`
  display: flex;
  width: 238px;
  height: 40px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;

  color: #000;
  font-family: "Wanted Sans";
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;


export const Round = styled.h3`
  position: absolute;
  width: 100%;

  color: ${COLORS.text};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;


export const Remain = styled.h4`
  min-width: 5rem;
  color: #00bfa3;
  text-align: right;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const TimerBar = styled.div`
  display: flex;
  width: 19.8125rem;
  height: 1rem;

  align-items: center;

  border-radius: 6.25rem;
  background: #605774;
  box-shadow: ${DROM_SHADOW};
`;

export const GaugeBar = styled.div<{
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

export const Board = styled.div`
  position: relative;
  width: 47.68744rem;
  height: 23.02538rem;

  background: url(${R2_URL}/assets/game/bell-board.svg);
  background-size: cover;
`;

export const Answer = styled.div`
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

export const AnswerText = styled.h2`
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

export const SRight = styled.div`
  display: flex;
  width: 31.125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.1875rem;
  flex-shrink: 0;
`;


export const CTimer = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  gap: 0.3125rem;
`;

export const LeftTimer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.3125rem;
`;
export const RightTimer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.3125rem;
`;

export const TimerIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const TimerText = styled.span`
  color: ${COLORS.text};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: ${FONT_SIZES['body-2']};
`;

export const RemainText = styled.span`
  color: #00801c;

  text-align: right;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: ${FONT_SIZES['body-2']};
`;

export const Systemlog = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
  width: 30rem;
  height: 25rem;
  gap: 19px;
  flex-shrink: 0;
`;

export const SystemlogItem = styled.div`
  display: flex;
  height: 3.75rem;
  max-width: 32.5rem;
  padding: 10.5px 0px 9.5px 0px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 16px;
  background: #FFF;

  color: #000;

  /* H4 - 24px - SemiBold */
  font-family: "Wanted Sans";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem;
  width: 200px;
`;

export const VolumeSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 0.375rem;
  border-radius: 0.25rem;
  background: ${COLORS['gray-4']};
  outline: none;
  opacity: 0.7;
  transition: opacity .2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0.96438rem;
    height: 0.96438rem;
    background: #5024D4;
    border-radius: 1rem;
    cursor: pointer;
  }
`;

export const VolumeText = styled.span`
  color: ${COLORS.text};
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  min-width: 3rem;
  text-align: right;
`;

export const VideoTime = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  bottom: 8px;
  right: 8px;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};
  transition: opacity 0.3s ease;
`;

export const LoadingOverlay = styled.div<{ $isLoading: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ $isLoading }) => ($isLoading ? 1 : 0)};
  visibility: ${({ $isLoading }) => ($isLoading ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

export const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;