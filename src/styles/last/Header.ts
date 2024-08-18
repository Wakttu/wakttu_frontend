import styled from 'styled-components';
import { COLORS } from '../theme';

const DROM_SHADOW = '0px 1px 10px 0px rgba(0, 0, 0, 0.15)';

const CHeader = styled.div`
  display: flex;

  width: 115rem;
  height: 3.75rem;

  justify-content: space-between;
  align-items: center;

  padding: 0.62rem;
  margin-bottom: 2.5rem;

  border-radius: 6.25rem;
  background: rgba(255, 255, 255, 0.5);
`;

const CButton = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  height: 2.5rem;
  gap: 0.625rem;

  width: 18.5rem;
  flex-shrink: 0;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  padding: 0.5rem 1.375rem;

  gap: 0.625rem;

  border: none;
  border-radius: 6.25rem;
  background: ${COLORS.pupple};

  box-shadow: ${DROM_SHADOW};

  cursor: pointer;
`;

const ButtonText = styled.h5`
  color: ${COLORS.bg};
  text-align: center;

  font-family: 'WantedSans-SemiBold';
`;

const ExitButton = styled.button`
  display: inline-flex;
  height: 2.5rem;
  padding: 0.3125rem 0.9375rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;

  border: none;
  border-radius: 6.25rem;
  background: #ff7070;

  box-shadow: ${DROM_SHADOW};

  cursor: pointer;
`;

const ExitIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

const CTitle = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: auto;
  gap: 0.625rem;
`;

const Index = styled.h5`
  color: #9d9d9d;
  text-align: center;

  /* H5 - 20px - SemiBold */
  font-family: 'WantedSans-SemiBold';
`;

const Title = styled.h4`
  color: ${COLORS.text};
  text-align: center;

  font-family: 'WantedSans-SemiBold';
`;

export {
  Title,
  Index,
  CTitle,
  ExitButton,
  ExitIcon,
  CHeader,
  ButtonText,
  CButton,
  Button,
};
