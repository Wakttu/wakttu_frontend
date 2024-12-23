import styled, { keyframes } from 'styled-components';
import { COLORS, FONT_SIZES } from '../theme';

const DROM_SHADOW = '0px 1px 10px 0px rgba(0, 0, 0, 0.15)';

const moveUpAndFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0) translateX(-50%);
  }
  100% {
    opacity: 0;
    transform: translateY(-2rem) translateX(-50%);
  }
`;

export const CPlayerList = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 1.25rem 3rem;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;

  z-index: 1001;
  background: linear-gradient(0deg, #b6ecc5 0%, #b6ecc5 100%);
`;

export const CPlayer = styled.div<{
  $turn?: boolean;
  $fail?: boolean;
  $end?: boolean;
}>`
  display: flex;
  width: 13rem;
  height: 15rem;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4375rem;
  flex-shrink: 0;

  position: relative;

  border-radius: 0.75rem;
  box-shadow: ${DROM_SHADOW};

  transition: transform 0.2s linear;

  ${({ $turn, $fail, $end }) => {
    if ($fail) {
      return `border: 4px solid #FF7070; background: #FFE6E6; transform : translate(0 , -0.8rem);`;
    } else if ($turn) {
      return `border: 4px solid #29cd00; background: #cfffb8; transform : translate(0 , -0.8rem);`;
    } else if ($end) {
      return `border: 4px solid #FF7070; background: #FFE6E6`;
    } else {
      return `background: linear-gradient(180deg, #fff 0%, #f2f2f2 100%);`;
    }
  }}
`;

export const PlusScore = styled.div<{ plus: boolean }>`
  position: absolute;
  top: 10%;
  right: 0.25rem;

  z-index: 2;
  color: ${({ plus }) => (plus ? '#00801c' : '#FF7070')};

  font-size: 1.4rem;
  font-weight: bold;

  animation: ${moveUpAndFadeOut} 2s ease-out forwards;
`;

export const CName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4375rem;
`;

export const Name = styled.h5`
  color: ${COLORS.text};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;

export const Score = styled.h3<{ team?: string }>`
  color: ${({ team }) => {
    switch (team) {
      case 'woo':
        return COLORS.blue;
      case 'gomem':
        return COLORS.red;
      case 'academy':
        return '#FFCC00';
      case 'isedol':
        return COLORS.green;
      default:
        return '#00801c';
    }
  }};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;
export const Host = styled.div`
  display: flex;
  padding: 0.25rem 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 1.875rem;
  background: #19ff14;

  & > span {
    color: ${COLORS.text};
    text-align: center;

    font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
    font-weight: 600;
    font-size: ${FONT_SIZES['subtitle-1']};
  }
`;
