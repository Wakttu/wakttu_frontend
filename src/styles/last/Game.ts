import { styled, keyframes } from 'goober';
import { COLORS, FONT_SIZES } from '../theme';
import { R2_URL } from '@/services/api';

const rotate = keyframes`
 from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
`;

export const CMain = styled('div')`
  display: flex;
  position: relative;
  align-items: flex-end;
  width: 111.9375rem;
  height: 21.9375rem;
  flex-shrink: 0;

  margin-top: 5.685rem;
`;

export const CLeft = styled('div')`
  display: flex;
  justify-content: center;
`;

export const Left = styled('img')`
  width: 5.625rem;
  flex-shrink: 0;
`;
export const Light = styled('img')<{ top: string; onLight: boolean }>`
  position: absolute;
  top: ${({ top }) => {
    return top;
  }};
  opacity: ${({ onLight }) => {
    return onLight ? 1 : 0;
  }};
  width: 4.625rem;
`;

export const CRight = styled('div')`
  display: flex;
  justify-content: center;
`;

export const Right = styled('img')`
  width: 12.6875rem;
  height: 21.5625rem;
  flex-shrink: 0;
`;
export const MissionText = styled('h2')`
  position: absolute;
  top: 10.5rem;

  color: ${COLORS.text};
  text-align: center;
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;

export const Main = styled('div')`
  display: flex;
  width: 100%;
  overflow-x: visible;
  justify-content: center;
  align-items: flex-end;
  gap: 1.3125rem;

  flex: 1 0 0;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CTrain = styled('div')`
  position: relative;
  width: 23.5rem;
  height: 20.1875rem;
  flex-shrink: 0;

  background-image: url(${R2_URL!}/assets/game/train.svg);
  background-repeat: no-repeat;
  background-size: cover;
`;

export const SWheel = styled('img')<{ $rotate?: boolean }>`
  position: absolute;
  width: 4.6rem;
  left: 2.5rem;
  bottom: 0.3rem;

  transition: ${({ $rotate }) =>
    $rotate
      ? 'transform 1.5s ease-in-out 0.5s'
      : 'transform 0 ease-in-out 0.5s'};

  ${({ $rotate }) => {
    return $rotate ? 'transform : rotate(-360deg)' : '';
  }};
`;

export const BWheel = styled('img')<{ left: string; $rotate?: boolean }>`
  position: absolute;
  width: 5.7rem;
  left: ${({ left }) => {
    return left;
  }};
  bottom: 0.2rem;

  transition: ${({ $rotate }) =>
    $rotate ? 'transform 2s ease-in-out 0.5s' : 'transform 0 ease-in-out 0.5s'};

  ${({ $rotate }) => {
    return $rotate ? 'transform : rotate(-360deg)' : '';
  }};
`;

export const CCargo = styled('div')`
  position: relative;
  width: 19.4375rem;
  height: 15.4375rem;
  flex-shrink: 0;

  background-image: url(${R2_URL!}/assets/game/cargo.svg);
  background-repeat: no-repeat;
  background-size: cover;
`;

export const CWord = styled('div')`
  display: flex;
  width: 15.875rem;
  height: 6.625rem;
  margin: 6.94rem 2.06rem 6.63rem 5.56rem;
  padding: 1rem 0.625rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;

  border-radius: 0.625rem;
  background: rgba(255, 255, 255, 0.75);
`;

export const CWordC = styled(CWord)`
  margin: 2.19rem 1.56rem 6.44rem 1.56rem;
`;

export const Logo = styled('img')`
  width: 12rem;
  height: 7.25rem;
  border-radius: 0.625rem;
`;

export const WordText = styled('h3')`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 2.2rem;
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;

export const CDesc = styled('div')`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
`;

export const Category = styled('div')`
  display: flex;
  width: 1rem;
  height: 1rem;
  align-items: center;
  justify-content: center;
  border-radius: 12.5rem;
  background: ${COLORS.pupple};

  color: ${COLORS.bg};
  text-align: center;
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: 0.625rem;
`;

export const Desc = styled('span')`
  overflow: hidden;
  color: ${COLORS['gray-2']};
  text-overflow: ellipsis;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  font-family: 'WantedSans-Medium';
  font-size: ${FONT_SIZES.caption};
`;

export const NameText = styled('span')<{ $name?: boolean }>`
  color: ${({ $name }) => {
    return $name ? COLORS.pupple : COLORS['gray-2'];
  }};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: ${FONT_SIZES['subtitle-1']};
`;

export const CHistory = styled('div')`
  position: absolute;
  top: -8rem;
  left: 10rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 20.2rem;
  overflow: scroll;

  gap: 0.25rem;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
