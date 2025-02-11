import { styled } from 'goober';
import { COLORS, FONT_SIZES } from '../theme';
import { FilterIcon } from './GameNav';

const CSelect = styled('div')`
  display: flex;
  width: 16.125rem;
  flex-direction: column;
  align-items: flex-start;

  position: absolute;
  top: 2rem;
  right: 0;
  padding: 1.75rem;
  gap: 1.5rem;

  border-radius: 1rem;
  border: 2px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

const CDropdown = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  align-self: stretch;
`;

const DropdownLabel = styled('span')`
  color: ${COLORS.text};

  font-family: 'WantedSans-Medium';
  font-size: ${FONT_SIZES['body-2']};
`;
const Dropdown = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  width: 12.5rem;
  padding: 0.625rem 0;

  border-radius: 0.5rem;
  border: 1px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};

  cursor: pointer;

  & > span {
    margin-left: 1rem;
  }
`;

const DropdownItem = styled('li')`
  width: 12.5rem;
  height: 1.9375rem;
  padding: 0.375rem 1rem;
  text-align: left;
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: ${FONT_SIZES['body-1']};

  cursor: pointer;

  &:first-of-type {
    margin-top: 0.75rem;
  }

  &:hover {
    background-color: ${COLORS['gray-4']};
  }
`;

const DropdownLine = styled('img')<{ isOpen: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;

  cursor: pointer;

  transform: ${({ isOpen }) => (isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)')};
  transition: transform 0.3s ease;
`;

const Selected = styled('span')`
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: ${FONT_SIZES['body-1']};
`;

const FilterWithText = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const FilterLabel = styled('h5')`
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;

const Icon = styled(FilterIcon)`
  width: 1.5rem;
`;

export {
  CSelect,
  FilterLabel,
  FilterWithText,
  CDropdown,
  Dropdown,
  DropdownItem,
  DropdownLabel,
  DropdownLine,
  Selected,
  Icon,
};
