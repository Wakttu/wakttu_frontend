import { styled } from 'goober';
import { COLORS } from '../theme';

export const CMain = styled('div')`
  position: relative;
  display: flex;
  width: 120rem;
  padding: 1.1875rem 2rem;
  justify-content: center;
  align-items: center;
  gap: 2.25rem;
  flex-shrink: 0;
`;

export const SLeft = styled('div')`
  position: relative;
  display: flex;
  width: 31.25rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: flex-start;
  gap: 1.1875rem;
  flex-shrink: 0;
`;

export const GameImg = styled('img')`
  width: 4rem;
  height: 4rem;
`;

export const TimerOverlay = styled('div')<{ $isVisible: boolean }>`
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

export const CTimer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const TimerImg = styled('img')`
  width: 3.5rem;
  height: 3.5rem;
`;

export const Middle = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40rem;

  border-radius: 1rem;
  gap: 1.1875rem;
`;

export const YoutubeWrapper = styled('div')`
  display: flex;
  width: 40rem;
  height: 22.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`;

export const VideoScreen = styled('div')<{ $isVisible: boolean }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.1875rem;

  position: relative;
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
  background: black;

  border-radius: 1rem;

  & > div:first-child {
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transition: opacity 0.15s ease;
  }
`;

export const Song = styled('div')`
  display: flex;
  width: 40rem;
  height: 7.5rem;
  padding: 0rem 1.875rem;
  align-items: center;
  gap: 0.625rem;

  border-radius: 1rem;
  background: ${COLORS.bg};
`;

export const SongIcon = styled('img')`
  width: 3.25rem;
  height: 3.25rem;
  flex-shrink: 0;

  border-radius: 1.625rem;
`;

export const SongInfo = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.25rem;
  flex: 1 0 0;
`;

export const SongText = styled('h4')`
  max-width: 21rem;

  color: ${COLORS.text};
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
`;

export const SongSmallText = styled('span')`
  color: ${COLORS['gray-3']};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const SRight = styled('div')`
  display: flex;
  width: 31.125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.1875rem;
  flex-shrink: 0;
`;

export const Systemlog = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  width: 31.125rem;
  height: 24rem;
  gap: 1.1875rem;
  flex-shrink: 0;
`;

export const SystemlogItem = styled('div')`
  display: flex;
  padding: 1.25rem 4.125rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  align-self: stretch;

  border-radius: 1rem;
  background: ${COLORS.bg};

  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 2rem;
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

export const SystemTag = styled('div')`
  display: flex;
  padding: 1.5rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;

  gap: 0.5rem;

  border-radius: 1rem;
  background: ${COLORS.bg};

  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  animation: slideIn 0.5s ease-out;

  flex-wrap: wrap;

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

export const SystemHint = styled('div')`
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;
  gap: 2rem;
  border-radius: 1rem;
  background: ${COLORS.bg};

  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 2rem;
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

export const HintText = styled('div')`
  display: flex;
  padding: 0.75rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 1rem;
  background: ${COLORS['gray-4']};

  color: ${COLORS.text};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
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
      default:
        const randomColor = Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0'); // 항상 6자리 보장
        const inverseColor = (0xffffff - parseInt(randomColor, 16))
          .toString(16)
          .padStart(6, '0'); // 반전 색상도 6자리 보장
        const darkColor =
          parseInt(randomColor, 16) < 0x808080
            ? `#${randomColor}`
            : `#${inverseColor}`;
        return darkColor;
    }
  }};

  color: ${COLORS.bg};

  text-align: center;
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const VolumeControl = styled('div')`
  display: flex;
  width: 10.75rem;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
`;

export const VolumeImg = styled('img')`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
`;

export const VolumeSlider = styled('input')`
  -webkit-appearance: none;
  width: 8.0625rem;
  height: 0.375rem;
  border-radius: 0.25rem;
  background: ${COLORS['gray-4']};
  outline: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1.125rem;
    height: 1.125rem;
    background: #5024d4;
    border-radius: 1rem;
    cursor: pointer;
  }
`;
