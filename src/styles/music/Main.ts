import styled, { css } from 'styled-components';
import { COLORS, FONT_SIZES } from '../theme';

export const CMain = styled.div`
  position: relative;
  display: flex;
  width: 120rem;
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

export const GameImg = styled.img`
  width: 4rem;
  height: 4rem;
`;

export const TimerOverlay = styled.div<{ $isVisible: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

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
  display: ${(props) => (props.$isVisible ? 'none' : 'block')};
`;

export const CTimer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const TimerImg = styled.img`
  width: 3.5rem;
  height: 3.5rem;
`;

export const Middle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45rem;
  padding: 1rem 3rem;
  height: 100%;
  border-radius: 1rem;
  border: 1px solid #000;
  background: #fff;
`;

export const YoutubeWrapper = styled.div`
  width: 40rem;
  height: 22.5rem;
`;

export const VideoScreen = styled.div<{ $isVisible: boolean }>`
  width: 40rem;
  height: 22.5rem;
  position: relative;
  background-color: #000;
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};

  & > div:first-child {
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transition: opacity 0.15s ease;
  }
`;

export const Song = styled.div`
  display: flex;
  width: 100%;
  justify-content: left;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1rem;
`;

export const SongIcon = styled.img`
  width: 2.6875rem;
  height: 2.625rem;
  flex-shrink: 0;

  border-radius: 2.6875rem;
`;

export const SongText = styled.h4<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;

  color: ${COLORS.text};
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;

  font-style: normal;
  font-weight: 600;
  line-height: normal;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
`;

export const SRight = styled.div`
  display: flex;
  width: 31.125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.1875rem;
  flex-shrink: 0;
`;

export const Systemlog = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  width: 31.125rem;
  height: 25rem;
  gap: 1.1875rem;
  flex-shrink: 0;
`;

export const SystemlogItem = styled.div`
  display: flex;
  max-width: 31.125rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.625rem 1rem;
  gap: 0.625rem;
  align-self: stretch;

  border-radius: 1rem;
  background: ${COLORS.bg};

  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  animation: slideIn 0.5s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
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

export const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem;
  width: 200px;
`;

export const VolumeImg = styled.img`
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
`;

export const VolumeSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 0.375rem;
  border-radius: 0.25rem;
  background: ${COLORS['gray-4']};
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0.96438rem;
    height: 0.96438rem;
    background: #5024d4;
    border-radius: 1rem;
    cursor: pointer;
  }
`;
