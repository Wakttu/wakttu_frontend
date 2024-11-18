import styled from 'styled-components';
import { COLORS, FONT_SIZES } from '../theme';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Container = styled.div`
  display: flex;
  width: 22.5rem;
  padding: 1.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  border-radius: 1rem;
  border: 2px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

export const Text = styled.h6`
  color: ${COLORS['gray-2']};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
`;

export const CButton = styled.div`
  display: flex;

  gap: 0.75rem;
`;
export const ConfirmButton = styled.button`
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

export const ConfrimText = styled.span`
  color: ${COLORS.bg};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: ${FONT_SIZES['subtitle-1']};
`;

export const CancleButton = styled.button`
  display: flex;

  flex: 1 0 0;

  padding: 0.625rem 2rem;
  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;
  border: 1px rgba(0, 0, 0, 0.1);
  background: ${COLORS['gray-4']};
`;

export const CancleText = styled.span`
  color: ${COLORS['gray-2']};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: ${FONT_SIZES['subtitle-1']};
`;
