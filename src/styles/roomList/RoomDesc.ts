import { styled, css } from 'goober';
import { COLORS, FONT_SIZES } from '@/styles/theme';

export type InfoVariant = 'title' | 'desc';

const CRoomDesc = styled('article')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 25rem;
  padding: 2rem 2rem;

  gap: 0.9375rem;

  border-radius: 1rem;
  border: 2px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

const WrapRoomTitle = styled('section')`
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  padding: 1rem 0.625rem;

  border-radius: 1rem;
  border: 1px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

const TitleText = styled('h5')`
  color: ${COLORS.text};
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
`;

const WrapGameInfo = styled('section')`
  display: flex;
  flex-direction: column;

  width: 100%;

  border-radius: 1.4rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const GameInfo = styled('img')`
  display: flex;
  align-self: stretch;
`;

const RoomInfo = styled('div')`
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: center;

  gap: 2rem;
  padding: 1.5rem 0.625rem;

  border-radius: 1rem;
`;

const WrapInfo = styled('ul')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 0.5rem;
`;

const Info = styled('li')<{ $variant?: InfoVariant }>`
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: ${FONT_SIZES['subtitle-2']};
  color: ${COLORS.text};

  ${({ $variant }) => {
    switch ($variant) {
      case 'title':
        return css`
          color: ${COLORS['gray-2']};
        `;
    }
  }}
`;

const WrapMod = styled('section')`
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: center;

  gap: 0.75rem;
`;

const Mod = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;

  flex: 1 0 0;

  gap: 0.625rem;
  padding: 1.25rem 1rem;

  border-radius: 1rem;
  border: 1px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

const ModText = styled('h5')`
  color: ${COLORS['gray-2']};
`;

const WatingLarge = styled('div')<{ $start?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 6.875rem;
  height: 4rem;
  padding: 1rem;

  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${({ $start }) => ($start ? '#FFF6A2' : COLORS['gray-5'])};
`;

const WatingText = styled('h5')`
  color: rgba(0, 0, 0, 0.5);
`;

const JoinButton = styled('button')<{ start?: boolean }>`
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: center;

  gap: 0.625rem;
  padding: 1.25rem 1rem;

  cursor: pointer;

  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${({ start }) => (start ? '#FFA2A2' : COLORS.primary)};

  &:hover {
    background-color: ${COLORS['primary-hov']};
    transition: 0.2s ease-in;
  }
`;

const JoinText = styled('h4')`
  color: ${COLORS.bg};
`;

export {
  CRoomDesc,
  WrapRoomTitle,
  TitleText,
  WrapGameInfo,
  GameInfo,
  RoomInfo,
  WrapInfo,
  Info,
  WrapMod,
  Mod,
  ModText,
  WatingLarge,
  WatingText,
  JoinButton,
  JoinText,
};
