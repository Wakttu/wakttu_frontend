import { styled } from 'goober';
import { COLORS, FONT_SIZES } from '@/styles/theme';

const CGameNav = styled('div')`
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: space-between;

  width: 62rem;

  padding: 0rem 0.25rem;
  background: ${COLORS.bg};
`;

const LeftIcons = styled('div')`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CreateRoomBtn = styled('button')`
  display: flex;
  align-items: center;

  gap: 0.625rem;
  padding: 0.5rem 0.75rem;

  border: none;
  border-radius: 0.5rem;

  cursor: pointer;
  background: ${COLORS.primary};
`;

const PlusTitle = styled('span')`
  color: ${COLORS.bg};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: ${FONT_SIZES['subtitle-2']};
`;

const Plus = styled('img')`
  width: 1.125rem;
  height: 1.125rem;
`;

const CSearch = styled('div')<{ $open: boolean }>`
  display: flex;
  width: ${({ $open }) => {
    return $open ? '15.625rem' : 'auto';
  }};
  height: 2.75rem;
  padding: 0.625rem 0.5rem;
  align-items: center;
  gap: 0.625rem;

  position: relative;

  border-radius: 0.5rem;
  border: ${({ $open }) => {
    return $open ? `2px solid ${COLORS['gray-4']}` : 'none';
  }};
  background: ${COLORS.bg};
`;

const SearchBtn = styled('img')`
  height: 1.2rem;

  cursor: pointer;
`;

const SearchInput = styled('input')`
  width: 100%;
  height: auto;
  margin: 0;

  outline: none;
  border: none;

  color: ${COLORS['gray-2']};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: ${FONT_SIZES['body-1']};
`;

const CloseBtn = styled('img')`
  position: absolute;
  right: 0.5rem;
  width: 1.3rem;
  height: 1.3rem;

  cursor: pointer;
`;

const RefreshBtn = styled('img')`
  width: 1.5rem;
  height: 1.5rem;

  cursor: pointer;
`;

const FilterToggled = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  gap: 0.625rem;
  padding: 0.5rem;

  border: none;
  background: ${COLORS.bg};

  cursor: pointer;
`;

const FilterIcon = styled('img')`
  width: 1.4rem;
  height: 1.4rem;
`;

export {
  CGameNav,
  LeftIcons,
  CreateRoomBtn,
  Plus,
  PlusTitle,
  SearchBtn,
  CloseBtn,
  RefreshBtn,
  FilterToggled,
  FilterIcon,
  CSearch,
  SearchInput,
};
