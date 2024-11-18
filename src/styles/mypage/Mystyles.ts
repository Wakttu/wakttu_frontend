import styled from 'styled-components';
import { COLORS } from '../theme';

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Character = styled.div`
  display: flex;

  width: 57.3125rem;
  gap: 0.625rem;
`;

const MyCharacterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 27.8125rem;
  height: 27.125rem;
  gap: 1rem;

  border-radius: 1rem;
  border: 2px solid ${COLORS['gray-4']};
`;

const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`;

const UserIcon = styled.img`
  width: 1.5625rem;
  height: 1.4375rem;
`;

const UserName = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
`;

const WearingItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;

  width: auto;
  max-width: 270rem;
  height: 27.125rem;

  padding: 1rem;
  gap: 0.625rem;

  box-sizing: border-box;
  border-radius: 1rem;
  border: 2px solid ${COLORS['gray-4']};
`;

const WearingItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  width: calc(50% - 0.625rem);
  height: 12.3125rem;
  gap: 1.5rem;

  border: 1px solid ${COLORS['gray-4']};
  border-radius: 0.5rem;
  overflow: hidden;
`;

const WearingImage = styled.img<{ item: string }>`
  width: ${({ item }) => {
    switch (item) {
      case 'hand':
        return '13rem';
      default:
        return ' 8.0625rem';
    }
  }};
  height: ${({ item }) => {
    switch (item) {
      case 'hand':
        return '13rem';
      default:
        return '7.8125rem';
    }
  }};
  object-fit: contain;
  ${({ src }) => (src ? 'opacity : 1' : 'opacity : 0')};
`;

const WearingTag = styled.div<{ $backgroundColor: string; $color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-shrink: 0;

  height: 1.75rem;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$color};

  font-size: 1.25rem;
  font-weight: 600;
`;

const Emoticon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const EmoticonBox = styled.div`
  height: 16.375rem;

  border-radius: 1rem;
  border: 2px solid ${COLORS['gray-4']};
`;

const ContentFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;

  flex: 1;
  align-items: end;
`;

export {
  Wrapper,
  Content,
  LeftWrapper,
  Character,
  MyCharacterBox,
  User,
  UserIcon,
  UserName,
  WearingItems,
  WearingItem,
  WearingImage,
  WearingTag,
  Emoticon,
  EmoticonBox,
  ContentFooter,
};
