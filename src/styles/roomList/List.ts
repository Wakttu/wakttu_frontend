import { styled } from 'goober';
import { COLORS, FONT_SIZES } from '../theme';

const CList = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 62rem;
  height: 31.875rem;
  padding: 2rem;

  background: ${COLORS.bg};
  border-radius: 1rem;
  border: 2px solid ${COLORS['gray-4']};
`;

const CItem = styled('div')`
  display: flex;
  flex-flow: wrap;

  width: 100%;
  gap: 0.75rem;

  cursor: pointer;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLORS['gray-4']};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    box-shadow: inset 0 0 5px ${COLORS['gray-3']};
    border-radius: 4px;
    border-left: 1.5px solid transparent;
    border-right: 1.5px solid transparent;
  }
`;

const Item = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 28.125rem;
  height: 6.25rem;
  padding: 1.5rem;

  border-radius: 1rem;
  border: 1px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};

  &:hover,
  :focus {
    border: 1px solid ${COLORS.primary};
  }
`;

const Summary = styled('div')`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RoomInfo = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
`;

const RoomNameCount = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const RoomName = styled('h5')`
  max-width: 10rem;

  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const RoomCount = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const RoomGame = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const SemiText = styled('span')<{ $color?: boolean }>`
  color: ${({ $color }) => ($color ? COLORS['gray-3'] : COLORS.text)};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: ${FONT_SIZES['subtitle-1']};
`;

const MediumText = styled('span')<{ $color?: boolean }>`
  color: ${({ $color }) => ($color ? COLORS['gray-3'] : COLORS.text)};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: ${FONT_SIZES['body-2']};
`;

const Status = styled('div')<{ $status?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.375rem 0.625rem;

  color: rgba(0, 0, 0, 0.5);
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: ${FONT_SIZES['subtitle-1']};

  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${({ $status }) => {
    switch ($status) {
      case 'full':
        return '#FFA2A2';
      case 'start':
        return '#FFF6A2';
      default:
        return COLORS['gray-5'];
    }
  }};
`;

const Lock = styled('img')`
  width: 0.8484rem;
  height: 0.9422rem;

  fill: ${COLORS['gray-3']};
`;
export {
  CList,
  CItem,
  Item,
  Summary,
  RoomInfo,
  RoomNameCount,
  RoomName,
  RoomCount,
  RoomGame,
  SemiText,
  MediumText,
  Status,
  Lock,
};
