import styled from 'styled-components';
import { COLORS, FONT_SIZES } from '../theme';

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  z-index: 4000;
  background: rgb(0, 0, 0, 0.1);
`;

const COption = styled.div`
  display: inline-flex;
  padding: 1.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;

  background: ${COLORS.bg};

  border-radius: 1rem;
  border: 2px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

const Setting = styled.img`
  width: 1.75rem;
  height: 1.75rem;
`;

const TitleText = styled.h4`
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const CVolume = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

const VoulmeText = styled.h6`
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const CButton = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  align-self: stretch;
`;

const SetButton = styled.button`
  display: flex;
  padding: 1rem 2.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;

  border: none;
  border-radius: 0.5rem;
  background: ${COLORS.primary};

  color: ${COLORS.bg};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: ${FONT_SIZES['subtitle-1']};
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  cursor: pointer;
  &:hover {
    background-color: ${COLORS['primary-hov']};
  }
`;

const Cancle = styled.button`
  display: flex;

  padding: 1rem 2.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${COLORS['gray-4']};
  cursor: pointer;

  color: rgba(0, 0, 0, 0.5);
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: ${FONT_SIZES['subtitle-1']};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const VolumeContainer = styled.div<{ range: number }>`
  position: relative;
  width: 17.6875rem;
  height: 0.375rem;
  background: ${({ range }) =>
    `linear-gradient(to right, ${COLORS['primary-hov']} 0%, ${
      COLORS['primary-hov']
    } ${range * 100}%, ${COLORS['gray-4']} ${range * 100}%, ${
      COLORS['gray-4']
    } 100%)`};
  border-radius: 0.25rem;
`;

const VInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  -webkit-appearance: none;
  width: 17.6875rem;

  margin: 0;
  height: 0.375rem;

  border-radius: 0.25rem;
  background: transparent;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0.96438rem;
    height: 0.96438rem;
    background: ${COLORS.primary};
    border-radius: 1rem;
  }
`;
export {
  VolumeContainer,
  VoulmeText,
  CVolume,
  COption,
  CButton,
  SetButton,
  Setting,
  Title,
  TitleText,
  Cancle,
  Modal,
  VInput,
};
