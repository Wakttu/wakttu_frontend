import styled from 'styled-components';
import { COLORS, FONT_SIZES } from '../theme';

const Modal = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  z-index: 100;
  background: rgb(0, 0, 0, 0.5);
`;

const Container = styled.div`
  display: flex;
  width: 22.5rem;
  padding: 1.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const Text = styled.span`
  color: ${COLORS['gray-2']};
  text-align: center;

  font-family: 'WantedSans-Medium';
  font-size: ${FONT_SIZES['body-1']};
`;

const Input = styled.input`
  display: flex;
  padding: 0.75rem 1rem;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;

  border-radius: 0.5rem;
  border: 1px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

const CButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ConfirmButton = styled.button`
  display: flex;
  width: 8.75rem;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;
  border: none;
  background: ${COLORS.primary};

  &:hover {
    background: ${COLORS['primary-hov']};
  }
`;

const ConfrimText = styled.span`
  color: ${COLORS.bg};
  text-align: center;

  font-family: 'WantedSans-SemiBold';
  font-size: ${FONT_SIZES['subtitle-1']};
  font-weight: 600;
`;

const CancleButton = styled.button`
  display: flex;
  width: 8.75rem;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;
  border: 1px rgba(0, 0, 0, 0.1);
  background: ${COLORS['gray-4']};
`;

const CancleText = styled.span`
  color: ${COLORS['gray-2']};
  text-align: center;

  font-family: 'WantedSans-SemiBold';
  font-size: ${FONT_SIZES['subtitle-1']};
  font-weight: 600;
`;

export {
  Modal,
  Container,
  Text,
  Input,
  CButton,
  ConfirmButton,
  CancleButton,
  ConfrimText,
  CancleText,
};