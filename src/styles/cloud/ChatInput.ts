import styled from 'styled-components';
import { COLORS, FONT_SIZES } from '../theme';

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 6.4375rem;
  padding: 1.3125rem 1.875rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  background-color: ${COLORS.bg};
`;

export const MessageBlock = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  border-radius: 5.1875rem;
  border: 1px solid ${COLORS['gray-4']};
  background: ${COLORS['gray-5']};
`;

export const MessageInput = styled.input`
  display: -webkit-box;
  width: 100%;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  border: none;
  background: ${COLORS['gray-5']};

  overflow: hidden;
  color: ${COLORS.text};
  text-overflow: ellipsis;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: ${FONT_SIZES['body-1']};
  font-weight: 500;

  &:focus {
    outline: none;
  }
`;

export const SendMessage = styled.button`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;
  border: none;
  background: ${COLORS.primary};

  cursor: pointer;
`;

export const SendIcon = styled.img`
  fill: ${COLORS.bg};
  width: 1.1004rem;
  height: 1.1004rem;
`;
