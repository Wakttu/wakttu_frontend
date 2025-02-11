import { styled, css } from 'goober';
import { COLORS } from '../theme';

type InfoVariant = 'title' | 'content';

export type CharacterVariant =
  | 'woowakgood'
  | 'ine'
  | 'jingburger'
  | 'lilpa'
  | 'jururu'
  | 'gosegu'
  | 'viichan'
  | 'gomem'
  | 'academy';

const characterColors = {
  woowakgood: {
    backgroundColor: '#164532',
    color: '#FFFFFF',
  },
  ine: {
    backgroundColor: '#8A2BE2',
    color: '#FFFFFF',
  },
  jingburger: {
    backgroundColor: '#F0A957',
    color: '#FFFFFF',
  },
  lilpa: {
    backgroundColor: '#2A265A',
    color: '#FFFFFF',
  },
  jururu: {
    backgroundColor: '#FF008C',
    color: '#FFFFFF',
  },
  gosegu: {
    backgroundColor: '#00A6FF',
    color: '#FFFFFF',
  },
  viichan: {
    backgroundColor: '#95C100',
    color: '#FFFFFF',
  },
  gomem: {
    backgroundColor: '#C75D00',
    color: '#FFFFFF',
  },
  academy: {
    backgroundColor: '#FF2323',
    color: '#FFFFFF',
  },
  wakta: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
  },
};

export const TitleSection = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 3.5rem;
  padding: 1rem 0.625rem;
  gap: 0.5rem;

  border-radius: 1rem;
  border: 1px solid ${COLORS['gray-4']};
  box-sizing: border-box;
`;

export const Tag = styled('div')<{ $character?: CharacterVariant }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.25rem 0.625rem;
  border-radius: 0.5rem;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;

  ${({ $character }) =>
    $character ? characterColors[$character] : characterColors.woowakgood};
`;

export const Title = styled('h5')`
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const InfoSection = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-around;

  border: 1px solid ${COLORS['gray-4']};
  border-radius: 1rem;
  overflow: hidden;
`;

export const InfoTop = styled('div')`
  display: flex;
  height: 21rem;
  padding: 2.5rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  border-radius: 1rem;
`;

export const Badge = styled('img')<{ got: boolean }>`
  width: 16rem;
  height: 16rem;
  flex-shrink: 0;
  position: relative;
  filter: ${({ got }) =>
    got ? 'grayscale(0)' : 'grayscale(1) brightness(0.7)'};
  border-radius: 22.5rem;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ got }) =>
      got
        ? 'transparent'
        : 'linear-gradient(180deg, rgba(128,128,128,0.6) 0%, rgba(128,128,128,0.9) 100%)'};
    border-radius: 22.5rem;
    pointer-events: none;
  }
`;
export const Hidden = styled('div')`
  width: 16rem;
  height: 16rem;
  border-radius: 22.5rem;
  background-color: black;
`;

export const InfoBottom = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 21rem;
  padding: 1.5rem;
  gap: 0.5rem;
`;

export const Wrap = styled('ul')`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;
`;

export const Info = styled('li')<{ $variant?: InfoVariant }>`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;

  ${({ $variant }) => {
    switch ($variant) {
      case 'title':
        return css`
          flex-shrink: 0;
          min-width: 4rem;

          color: ${COLORS['gray-2']};
          font-weight: 500;
        `;

      case 'content':
        return css`
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          flex-grow: 1;

          font-weight: 600;
          color: ${COLORS.text};
        `;
    }
  }}
`;
