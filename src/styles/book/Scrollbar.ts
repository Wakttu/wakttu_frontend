import { css } from 'goober';
import { COLORS } from '../theme';

export const scrollbarStyles = css`
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
