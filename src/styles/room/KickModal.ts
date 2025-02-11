import { styled } from 'goober';
import { COLORS, FONT_SIZES } from '../theme';

const Modal = styled('form')`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  z-index: 100;
  background: rgb(0, 0, 0, 0.1);
`;

const Container = styled('div')`
  display: flex;
  width: 22.5rem;
  padding: 1.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  border-radius: 2rem;
  border: 2px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

const Text = styled('h6')`
  color: ${COLORS['gray-2']};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
`;

const CButton = styled('div')`
  display: flex;

  gap: 0.75rem;
`;
const ConfirmButton = styled('button')`
  display: flex;

  flex: 1 0 0;

  padding: 0.625rem 2rem;
  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;
  border: none;
  background: ${COLORS.primary};

  &:hover {
    background: ${COLORS['primary-hov']};
  }
`;

const ConfrimText = styled('span')`
  color: ${COLORS.bg};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: ${FONT_SIZES['subtitle-1']};
`;

const CancleButton = styled('button')`
  display: flex;

  flex: 1 0 0;

  padding: 0.625rem 2rem;
  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;
  border: 1px rgba(0, 0, 0, 0.1);
  background: ${COLORS['gray-4']};
`;

const CancleText = styled('span')`
  color: ${COLORS['gray-2']};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: ${FONT_SIZES['subtitle-1']};
`;

export {
  Modal,
  Container,
  Text,
  CButton,
  ConfirmButton,
  CancleButton,
  ConfrimText,
  CancleText,
};
