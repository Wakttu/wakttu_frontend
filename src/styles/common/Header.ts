import { styled } from 'goober';
import { COLORS, FONT_SIZES } from '@/styles/theme';

const HeaderBlock = styled('div')`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;

  width: 88rem;
  height: 4.1875rem;

  padding: 0 2rem;

  border-radius: 1rem;
  border: 2px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

const HeaderLogo = styled('img')`
  width: 42px;
  height: 42px;
  flex-shrink: 0;

  cursor: pointer;
`;

const WrapContent = styled('ul')`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1.5rem;
`;

const Content = styled('div')`
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;

  color: ${COLORS.text};
  cursor: pointer;
`;

const Player = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem 1rem;
  gap: 0.5rem;

  border-radius: 0.5rem;
  background: ${COLORS['gray-1']};
`;

const Rank = styled('img')`
  width: 18px;
  height: 18px;
`;

const Line = styled('div')`
  width: 0.0625rem;
  height: 0.875rem;

  border-radius: 0.0625rem;
  background: ${COLORS['gray-2']};
`;

const PlayerName = styled('span')`
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${COLORS.bg};
`;

export {
  HeaderBlock,
  HeaderLogo,
  WrapContent,
  Content,
  Player,
  Rank,
  Line,
  PlayerName,
};
