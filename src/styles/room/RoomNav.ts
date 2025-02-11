import { styled } from 'goober';
import { COLORS, FONT_SIZES } from '../theme';

const CRoomNav = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CButton = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ExitButton = styled('button')`
  display: flex;
  padding: 0.5rem 0.75rem;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;

  border-radius: 0.5rem;
  border: none;
  background: #ff6565;
`;

const ExitIcon = styled('img')`
  width: 0.7012rem;
  height: 0.75rem;
`;

const ButtonText = styled('span')`
  color: ${COLORS.bg};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: ${FONT_SIZES['subtitle-2']};
`;

const ChangeButton = styled('button')`
  display: flex;
  padding: 0.5rem 0.75rem;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;

  border-radius: 0.5rem;
  border: none;
  background: ${COLORS.blue};
`;

const ChangeIcon = styled('img')`
  width: 0.7012rem;
  height: 0.75rem;
`;

const UpdateButton = styled('button')`
  display: flex;
  padding: 0.5rem 0.75rem;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;

  border-radius: 0.5rem;
  border: none;
  background: ${COLORS.primary};
`;

const UpdateIcon = styled('img')`
  width: 0.8738rem;
  height: 0.8738rem;
`;

export {
  CRoomNav,
  CButton,
  ChangeButton,
  ChangeIcon,
  ExitButton,
  ExitIcon,
  ButtonText,
  UpdateButton,
  UpdateIcon,
};
