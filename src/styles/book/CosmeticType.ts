import { styled, css } from 'goober';
import { getR2URL, R2_URL } from '@/services/api';

export type CosmeticVariant = 'all' | 'skin' | 'head' | 'hand' | 'eye';

export const CosmeticStyles: Record<
  CosmeticVariant,
  { name: string; backgroundColor: string; color: string }
> = {
  all: {
    name: '전체',
    backgroundColor: 'none',
    color: 'none',
  },
  skin: {
    name: '스킨',
    backgroundColor: '#B6ECC5',
    color: '#155126',
  },
  head: {
    name: '머리',
    backgroundColor: '#A8FFFB',
    color: '#004E66',
  },
  hand: {
    name: '손',
    backgroundColor: '#FFF6A2',
    color: '#665C00',
  },
  eye: {
    name: '눈',
    backgroundColor: '#FFA2A2',
    color: '#660000',
  },
};

const CosmeticType = ({ $itemType }: { $itemType?: CosmeticVariant }) => {
  const style = CosmeticStyles[$itemType || 'skin'];
  return css`
    background-color: ${style.backgroundColor};
    color: ${style.color};
  `;
};

const BackgroundImage = css`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-image: url(${getR2URL('/assets/mypage-background.png')});
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.3;
  }
`;

const CosmeticBackground = styled('div')<{ $itemType?: CosmeticVariant }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: -1;

  ${({ $itemType }) => {
    const style = CosmeticStyles[$itemType || 'skin'];
    return css`
      background-color: ${style.backgroundColor};
      background: linear-gradient(180deg, ${style.backgroundColor}, white);
    `;
  }}
`;

export { CosmeticType, BackgroundImage, CosmeticBackground };
