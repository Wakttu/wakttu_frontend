import styled from 'styled-components';

const CharacterImage = styled.div`
  position: relative;
  width: 11.25rem;
  height: 9.125rem;
`;

const SkinItem = styled.img<{ skin?: string }>`
  position: absolute;
  bottom: 0;
  width: 11.25rem;
  height: ${({ skin }) => {
    switch (skin) {
      case 'S-6': {
        return '9.125rem';
      }
      case 'S-4': {
        return '7.2rem';
      }
      default: {
        return '7.8125rem';
      }
    }
  }};
  opacity: ${({ skin }) => (skin ? 1 : 0)};
`;

const HeadItem = styled.img<{ skin?: string }>`
  position: absolute;
  z-index: 3;
  width: 11.25rem;
  height: 7.8125rem;
  bottom: 0;

  margin-bottom: ${({ skin }) => {
    switch (skin) {
      case 'S-8':
        return '1rem';
      default:
        return 0;
    }
  }};

  opacity: ${({ src }) => (src ? 1 : 0)};
`;
const HandItem = styled.img<{ skin?: string; item?: string }>`
  position: absolute;
  bottom: 0;
  z-index: 4;
  width: 11.25rem;
  height: 7.8125rem;

  margin-bottom: ${({ skin, item }) => {
    switch (skin) {
      case 'S-8':
        if (item === 'H-2' || item === 'H-3') return '1rem';
      default:
        return 0;
    }
  }};

  opacity: ${({ src }) => (src ? 1 : 0)};
`;

const EyeItem = styled.img<{ skin: string }>`
  position: absolute;
  bottom: 0;
  z-index: 5;
  margin-bottom: ${({ skin }) => {
    switch (skin) {
      case 'S-8': {
        return '1rem';
      }
    }
  }};
  width: 11.25rem;
  height: 7.8125rem;

  opacity: ${({ src }) => (src ? 1 : 0)};
`;

export { CharacterImage, SkinItem, HeadItem, HandItem, EyeItem };
