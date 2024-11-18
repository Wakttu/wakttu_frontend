import styled from 'styled-components';
import { COLORS, FONT_SIZES } from '../theme';

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin-top: auto;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const CopyRight = styled.span`
  color: ${COLORS['gray-1']};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: ${FONT_SIZES['body-2']};
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  cursor: pointer;
`;

const Pdf = styled.span`
  color: ${COLORS['gray-2']};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: ${FONT_SIZES['body-2']};
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  cursor: pointer;
`;

const Flex = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export { Info, CopyRight, Pdf, Flex };
