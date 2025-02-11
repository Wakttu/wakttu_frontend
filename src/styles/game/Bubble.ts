import { styled } from 'goober';
import { COLORS } from '../theme';
import { FONT_SIZES } from '../theme';

export const Bubble = styled('div')`
  position: absolute;
  background: ${COLORS.bg};
  border-radius: 0.4rem;
  top: -2.25rem;
  width: 12rem;
  padding: 1rem;

  border: 2px solid ${COLORS['gray-5']};

  z-index: 3000;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: ${FONT_SIZES['subtitle-1']};
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 1.25rem solid transparent;
    border-top-color: ${COLORS.bg};
    border-bottom: 0;
    margin-left: -1.25rem;
    margin-bottom: -1.25rem;
  }
`;
