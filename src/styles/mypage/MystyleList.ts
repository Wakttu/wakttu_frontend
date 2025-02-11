import { styled, css } from 'goober';
import { COLORS } from '../theme';
import { scrollbarStyles } from '../book/Scrollbar';
import { CosmeticStyles, CosmeticVariant } from '../book/CosmeticType';

const RightWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const ListBox = styled('div')`
  display: flex;
  flex-direction: column;

  height: 54.6875rem;
  padding: 1rem 1rem 0 1rem;
  gap: 1.5625rem;

  border-radius: 1rem;
  border: 2px solid ${COLORS['gray-4']};
`;

const TagBox = styled('div')`
  display: flex;

  padding: 0.5rem;
  gap: 0.5rem;

  border-radius: 1rem;
  border: 1px solid ${COLORS['gray-4']};
`;

const Tag = styled('div')<{ $isClicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;

  padding: 0.4375rem 0;
  font-weight: 600;
  cursor: pointer;

  border-radius: 0.5rem;
  background-color: ${({ $isClicked }) =>
    $isClicked ? COLORS['primary'] : 'transparent'};
  color: ${({ $isClicked }) => ($isClicked ? 'white' : COLORS['text'])};
`;

const ListItems = styled('div')`
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;

  height: 100%;
  margin-bottom: 1rem;

  gap: 0.8125rem;
  overflow-y: scroll;
  overflow-x: hidden;
  ${scrollbarStyles};
`;

const ListItem = styled('div')<{ $isClickedItem: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 12.625rem;
  height: 13.25rem;
  padding: 1.3125rem 0;

  gap: 0.3125rem;

  border-radius: 1rem;
  border: 2px solid
    ${(props) => (props.$isClickedItem ? COLORS['primary'] : COLORS['gray-4'])};
  cursor: pointer;

  &:hover {
    border: 2px solid
      ${(props) =>
        props.$isClickedItem ? COLORS['primary'] : COLORS['primary-hov']};
  }
`;

const ImageBox = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 10rem;
  height: 7.5rem;
  padding: 0.9375rem 0;
`;

const ItemImage = styled('img')<{ item: string; id?: string }>`
  position: absolute;
  width: ${({ item }) => {
    switch (item) {
      case 'hand':
        return '13rem';
      default:
        return '6.75rem';
    }
  }};
  height: ${({ item }) => {
    switch (item) {
      case 'hand':
        return '13rem';
      default:
        return '6.52rem';
    }
  }};

  object-fit: contain;
  ${({ item, id }) =>
    item === 'hand' ? (id === 'H-5' ? 'bottom:0.2rem;' : 'left: 1rem;') : ''};
`;

const ItemInfo = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 2.8125rem;
  gap: 0.5rem;
`;

const ItemTag = styled('span')<{ $itemType?: CosmeticVariant }>`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.625rem;

  border-radius: 0.5rem;
  ${({ $itemType }) => {
    const style = CosmeticStyles[$itemType || 'all'];
    return css`
      background-color: ${style.backgroundColor};
      color: ${style.color};
    `;
  }}

  font-size: 0.875rem;
  font-weight: 600;
`;

const ItemName = styled('span')`
  max-width: 7rem;
  word-wrap: break-word;
  font-size: 1.125rem;
`;

export {
  RightWrapper,
  ListBox,
  TagBox,
  Tag,
  ListItems,
  ListItem,
  ImageBox,
  ItemImage,
  ItemInfo,
  ItemTag,
  ItemName,
};
