import { styled } from 'goober';
import { COLORS, FONT_SIZES } from '../theme';

const CUserList = styled('article')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 25rem;
  padding: 3rem 2rem;

  gap: 1rem;

  border-radius: 1rem;
  border: 2px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

const ListTitle = styled('div')`
  display: flex;
  padding: 1rem 0.625rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  gap: 0.5rem;

  border-radius: 1rem;
  border: 1px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

const Title = styled('h5')`
  color: ${COLORS.text};
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
`;

const Count = styled('div')`
  display: flex;
  padding: 0.25rem 0.625rem;
  justify-content: center;
  align-items: center;

  color: ${COLORS['gray-2']};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: ${FONT_SIZES['subtitle-2']};
  font-weight: 600;

  border-radius: 0.5rem;
  background: ${COLORS['gray-4']};
`;

const List = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  height: 29.875rem;

  gap: 0.5rem;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLORS['gray-4']};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    box-shadow: inset 0 0 5px ${COLORS['gray-3']};
    border-radius: 4px;
    border-left: 1.5px solid transparent;
    border-right: 1.5px solid transparent;
  }
`;

const CPlayer = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const Icon = styled('img')`
  width: 1.125rem;
  height: 1.125rem;
`;

const Name = styled('h5')<{ $color: string }>`
  color: ${({ $color }) => {
    return $color;
  }};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
`;

export { CUserList, ListTitle, Title, Count, List, CPlayer, Icon, Name };
