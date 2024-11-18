import styled from 'styled-components';
import { COLORS, FONT_SIZES } from '../theme';

const WrapForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.625rem;
`;

const MainLogo = styled.img`
  width: 20.5rem;
  height: 13.0625rem;
`;

const CLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  align-self: stretch;
`;

const GusetLogin = styled.div`
  display: flex;
  padding: 1.125rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;

  border-radius: 1rem;
  border: 1px solid var(--Gray-4, #eaeaea);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);

  cursor: pointer;

  &:hover {
    background: ${COLORS['gray-4']};
  }
`;

const GuestText = styled.h6`
  color: ${COLORS['gray-2']};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const WakGamesLogin = styled.div`
  display: flex;
  padding: 1.125rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;

  border-radius: 1rem;
  border: 1px solid var(--Outline-Black, rgba(0, 0, 0, 0.1));
  background: ${COLORS['primary']};
  box-shadow: 0px 4px 10px 0px rgba(0, 210, 177, 0.3);

  cursor: pointer;

  &:hover {
    background: ${COLORS['primary-hov']};
  }
`;

const WakgamesText = styled.h6`
  color: ${COLORS.bg};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const SignUp = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 0.375rem;
`;

const LeftText = styled.span`
  display: inline-block;
  height: 1.125rem;
  color: ${COLORS['gray-2']};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: ${FONT_SIZES['body-1']};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const CRight = styled.div`
  display: flex;

  align-items: center;
  cursor: pointer;
`;

const RightText = styled.span`
  color: ${COLORS.primary};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: ${FONT_SIZES['body-1']};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const RightArrow = styled.img`
  width: 1.125rem;
  height: 1.125rem;
`;

const GameStart = styled.div`
  display: flex;
  width: 17.5rem;
  padding: 1.125rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  align-self: center;

  color: ${COLORS.bg};
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: 1.125rem;

  border-radius: 1rem;
  border: 1px solid var(--Outline-Black, rgba(0, 0, 0, 0.1));
  background: ${COLORS.primary};
  box-shadow: 0px 4px 10px 0px rgba(0, 210, 177, 0.3);

  cursor: pointer;

  &:hover {
    background: ${COLORS['primary-hov']};
  }
`;

const CStart = styled.div`
  display: flex;
  width: 17.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.875rem;
`;

const CTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CPLayer = styled.div`
  position: relative;
  display: flex;
  width: 17.5rem;
  align-items: center;
  gap: 0.875rem;
  padding: 0 1.5rem;
  border-radius: 1rem;
  border: 1px solid ${COLORS['gray-4']};
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
`;

const Info = styled.div`
  position: absolute;
  right: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
`;

const NameNRank = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.2rem;
`;

const PlayerName = styled.span`
  color: ${COLORS.text};
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: 1rem;
`;

const Rank = styled.img`
  width: 1.125rem;
  height: 1.125rem;
`;

const Wakgames = styled(Rank)`
  width: 0.959rem;
  height: 1rem;
`;

const LevelBar = styled.div`
  width: 8.25rem;
  height: 0.5rem;

  border-radius: 1rem;
  background: ${COLORS['gray-4']};
`;

const GaugeBar = styled.div<{ $exp: number }>`
  width: ${({ $exp }) => {
    return $exp + '%';
  }};
  height: 100%;
  border-radius: 1rem;
  background: ${COLORS.primary};
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
`;

const GrayText = styled.span`
  color: ${COLORS['gray-2']};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: ${FONT_SIZES.caption};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const BlackText = styled.span`
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: ${FONT_SIZES.caption};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export {
  WrapForm,
  MainLogo,
  GameStart,
  PlayerName,
  Rank,
  Wakgames,
  GuestText,
  GusetLogin,
  WakGamesLogin,
  WakgamesText,
  SignUp,
  LeftText,
  RightArrow,
  RightText,
  CLogin,
  CRight,
  CPLayer,
  Info,
  NameNRank,
  LevelBar,
  GaugeBar,
  Stat,
  GrayText,
  BlackText,
  CStart,
  CTop,
};
