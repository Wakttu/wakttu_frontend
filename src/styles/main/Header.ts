import { styled } from 'goober';
import { COLORS } from '../theme';

const MainHeaderBlock = styled('div')`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;

  width: 88rem;
  height: 8rem;

  padding: 0 2rem;

  border-radius: 1rem;
  border: none;
  background: none;
`;

const MainContent = styled('li')`
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;

  color: ${COLORS.text};
  cursor: pointer;
`;

const MainHeaderLogo = styled('img')`
  width: 42px;
  height: 42px;
  cursor: pointer;
`;

export { MainHeaderBlock, MainContent, MainHeaderLogo };
