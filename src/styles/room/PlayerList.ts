import styled from 'styled-components';
import { COLORS, FONT_SIZES } from '../theme';

const CPlayerList = styled.article`
  display: flex;
  align-items: flex-start;
  align-self: stretch;

  width: 62rem;
  padding: 1rem 2rem;
  border-radius: 1rem;
  border: 2px solid ${COLORS['gray-4']};
`;

const WrapPlayerList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-wrap: wrap;

  width: 100%;
  gap: 0.875rem;
`;

const CPlayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  width: 23.8%;
`;

const PlayerInfo = styled.div<{ host?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  height: 13rem;

  position: relative;
  padding: 1rem;
  gap: 0.8125rem;

  border-radius: 1rem 1rem 0px 0px;
  border-top: 1px solid ${COLORS['gray-4']};
  border-right: 1px solid ${COLORS['gray-4']};
  border-left: 1px solid ${COLORS['gray-4']};
  border-color: ${({ host }) => (host ? COLORS.primary : COLORS['gray-4'])};
  background: ${COLORS['gray-5']};
`;

const PlayerProfile = styled.img`
  flex-shrink: 0;

  width: 6.625rem;
  height: 6.6875rem;
`;

const CBadge = styled.div`
  display: flex;
  align-items: center;

  gap: 0.375rem;
`;

const PlayerIcon = styled.img`
  width: 1.125rem;
  height: 1.125rem;
`;

const PlayerName = styled.h6`
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 500;
`;

const PlayerReady = styled.div<{ $ready?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  padding: 0.4375rem 0;
  width: 100%;
  height: 2.125rem;

  border-radius: 0 0 1rem 1rem;
  background: ${(props) => (props.$ready ? COLORS.primary : COLORS['gray-4'])};

  & > span {
    color: ${(props) => (props.$ready ? COLORS.bg : COLORS.text)};
    text-align: center;
    white-space: nowrap;

    font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
    font-weight: 600;
    font-size: ${FONT_SIZES['subtitle-1']};
  }
`;

const KickIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;

  position: absolute;
  right: 0.5rem;
  top: 0.7432rem;

  cursor: pointer;
`;

const TeamTag = styled.div<{ team: string }>`
  position: absolute;
  left: 0.5rem;
  top: 0.7432rem;
  display: flex;
  width: 4rem;
  padding: 0.125rem 0.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 0.5rem;
  background: var(--Button-Blue, #85e2ff);

  background: ${({ team }) => {
    switch (team) {
      case 'woo': {
        return COLORS.blue;
      }
      case 'gomem': {
        return COLORS.red;
      }
      case 'academy': {
        return COLORS.yellow;
      }
      case 'isedol': {
        return COLORS.green;
      }
    }
  }};
  color: rgba(0, 0, 0, 0.5);

  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: ${FONT_SIZES['subtitle-1']};
  font-weight: 500;
`;

export {
  CPlayerList,
  WrapPlayerList,
  CPlayer,
  PlayerInfo,
  PlayerProfile,
  CBadge,
  PlayerIcon,
  PlayerName,
  PlayerReady,
  KickIcon,
  TeamTag,
};
