import { styled } from 'goober';
import { COLORS, FONT_SIZES } from '../theme';

export const Container = styled('div')`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);

  z-index: 100;
`;

export const CModal = styled('div')`
  display: flex;
  width: 56.25rem;
  padding: 3rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem;
  background: ${COLORS.bg};

  border-radius: 1rem;
  border: 2px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

export const CTitle = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const Trophy = styled('img')`
  width: 2rem;
  height: 2rem;
`;

export const ResultTitle = styled('h3')`
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;

export const CBody = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  align-self: stretch;
`;

export const CResult = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  align-self: stretch;
`;

export const RankList = styled('div')`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 1.5rem;
`;

export const CPlayer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

export const Card = styled('div')<{ rank: number }>`
  display: flex;
  width: 13.625rem;
  height: ${({ rank }) => {
    if (rank === 1) {
      return '18.75rem';
    } else if (rank === 2) {
      return '17.5rem';
    } else {
      return '16.4rem';
    }
  }};
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 0.8125rem;

  border-radius: 1rem;
  border: 1px solid ${COLORS['gray-4']};
  border-bottom: none;
  background: ${COLORS['gray-5']};
`;

export const Character = styled('img')`
  width: 7rem;
  height: 7.0625rem;
`;

export const NameTag = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const Grade = styled('img')`
  width: 1.125rem;
  height: 1.125rem;
`;

export const Name = styled('h6')`
  color: ${COLORS.text};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Score = styled('h4')<{ rank: number }>`
  width: 100%;
  color: ${({ rank }) => {
    if (rank === 1) {
      return '#FFCA42';
    } else if (rank === 3) {
      return '#FFBCA2';
    } else {
      return COLORS['gray-3'];
    }
  }};

  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const Rank = styled('div')<{ rank: number }>`
  display: flex;
  height: 2.125rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;

  border-radius: 0rem 0rem 1rem 1rem;
  background: ${({ rank }) => {
    if (rank === 1) {
      return COLORS.yellow;
    } else if (rank === 3) {
      return '#FFBCA2';
    } else {
      return COLORS['gray-4'];
    }
  }};

  color: rgba(0, 0, 0, 0.5);
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const RestList = styled('div')`
  display: flex;
  width: 43.75rem;
  padding: 1rem 2rem;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 1rem 3rem;
  flex-wrap: wrap;

  border-radius: 1rem;
  border: 1px solid ${COLORS['gray-4']};
  background: ${COLORS['gray-5']};
`;

export const RestItem = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.8125rem;
`;

export const RestText = styled('h6')`
  color: ${COLORS['gray-2']};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const CFooter = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  align-self: stretch;
`;

export const CLevel = styled('div')`
  display: flex;
  width: 43.75rem;

  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
`;

export const CLevelIcon = styled('div')`
  display: flex;

  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

export const NowLevel = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

export const Exp = styled('span')`
  color: ${COLORS.primary};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: ${FONT_SIZES['body-1']};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const ExpBar = styled('div')`
  width: 43.75rem;
  height: 0.625rem;
  flex-shrink: 0;

  border-radius: 1.125rem;
  background: ${COLORS['gray-4']};
`;

export const Gauge = styled('div')<{ exp: number }>`
  width: ${({ exp }) => exp + '%'};
  height: 100%;

  border-radius: 1.125rem;
  background: ${COLORS.primary};
`;

export const Stat = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
`;

export const Item = styled('div')<{ $color?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: ${({ $color }) => ($color ? COLORS['gray-2'] : COLORS.text)};
`;

export const StatText = styled('h6')<{ $color: boolean }>`
  color: ${({ $color }) => ($color ? COLORS['gray-2'] : COLORS.text)};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Confirm = styled('button')`
  display: flex;
  width: 25rem;
  padding: 1rem 5.875rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 0.5rem;
  border: none;
  background: ${COLORS.primary};

  color: ${COLORS.bg};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    background-color: ${COLORS['primary-hov']};
  }
`;
