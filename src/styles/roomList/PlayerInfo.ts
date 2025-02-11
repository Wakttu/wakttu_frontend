import { styled, css } from 'goober';
import { COLORS, FONT_SIZES } from '@/styles/theme';
import { InfoVariant } from './RoomDesc';

const CPlayerInfo = styled('article')`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 25rem;

  gap: 1.5rem;
  padding: 2.3rem 1rem;

  border-radius: 1rem;
  border: 2px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

const PlayerProfile = styled('div')`
  position: relative;
  flex-shrink: 0;

  width: 6.875rem;
  height: 7.3705rem;
`;

const Info = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 0.625rem;
`;

const WrapPlayerName = styled('div')`
  display: flex;
  align-self: stretch;
  align-items: center;

  gap: 0.625rem;
`;

const PlayerIcon = styled('img')`
  width: 1.5rem;
  height: 1.5rem;
`;

const PlayerName = styled('h5')`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  flex: 1 0 0;

  overflow: hidden;
  color: ${COLORS.text};
  text-overflow: ellipsis;
`;

const Level = styled('section')`
  display: flex;
  align-self: stretch;
  align-items: flex-start;
  flex-direction: column;

  gap: 0.625rem;
`;

const LevelBar = styled('div')`
  width: 11.875rem;
  height: 0.5rem;

  border-radius: 1rem;
  background: ${COLORS['gray-4']};
`;

const GaugeBar = styled('div')<{ $exp: number }>`
  width: ${({ $exp }) => {
    return $exp + '%';
  }};
  height: 100%;
  border-radius: 1rem;
  background: ${COLORS.primary};
`;

const LevelInfo = styled('ul')`
  display: flex;
  align-self: stretch;
  align-items: center;

  gap: 0.2rem;
`;

const WrapText = styled('div')`
  display: flex;
  align-items: center;

  gap: 0.2rem;
`;

const LevelText = styled('li')<{ $variant?: InfoVariant }>`
  font-weight: 600;
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

const WrapCoin = styled('div')`
  display: flex;
  align-self: stretch;
  align-items: center;

  gap: 0.25rem;
`;

const Wallet = styled('img')`
  width: 1.5rem;
  height: 1.5rem;
`;

const Coin = styled('span')`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  flex: 1 0 0;

  overflow: hidden;
  color: ${COLORS.text};
  text-overflow: ellipsis;

  font-weight: 600;
  font-size: ${FONT_SIZES['subtitle-1']};
`;

export {
  CPlayerInfo,
  PlayerProfile,
  Info,
  WrapPlayerName,
  PlayerIcon,
  PlayerName,
  Level,
  LevelBar,
  GaugeBar,
  LevelInfo,
  LevelText,
  WrapText,
  WrapCoin,
  Wallet,
  Coin,
};
