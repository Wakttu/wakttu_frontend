import { styled } from 'goober';
import { COLORS } from '../theme';

const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-top: 1.3125rem;
`;

const Buttons = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  height: 2.5rem;
  gap: 0.75rem;
`;

const SaveButton = styled('div')`
  display: flex;
  align-items: center;

  padding: 0.5rem 0.75rem;
  gap: 0.5rem;

  border-radius: 0.5rem;
  background-color: ${COLORS['primary']};
  font-size: 1.125rem;
  color: white;
  cursor: pointer;
`;

const ResetButton = styled('div')`
  display: flex;
  align-items: center;

  padding: 0.5rem 0.75rem;
  gap: 0.5rem;

  border-radius: 0.5rem;
  background-color: #ff7070;
  font-size: 1.125rem;
  color: white;
  cursor: pointer;
`;

const ButtonIcon = styled('img')`
  width: 1.5rem;
  height: 1.5rem;
  fill: white;
`;

export { Header, Buttons, SaveButton, ButtonIcon, ResetButton };
