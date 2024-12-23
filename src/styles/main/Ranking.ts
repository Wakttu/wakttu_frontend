import styled from 'styled-components';
import { COLORS, FONT_SIZES } from '../theme';

const Wrapper = styled.div`
  display: flex;
  width: 68.75rem;
  height: 52.125rem;
  padding: 2rem 0rem;
  margin: auto;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  flex-shrink: 0;

  border-radius: 1rem;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.01);
`;

const Title = styled.h2`
  color: ${COLORS.text};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  flex: 1 0 0;
  align-self: stretch;
`;

const Nav = styled.div`
  display: flex;
  padding: 0.75rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;

  background: ${COLORS.bg};

  border-radius: 1rem;
  border: 1px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

const Button = styled.button<{ isClicked?: boolean }>`
  display: flex;
  padding: 0.75rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;

  border-radius: 0.5rem;
  border: none;
  background: ${({ isClicked }) => (isClicked ? COLORS.primary : COLORS.bg)};

  cursor: pointer;

  color: ${({ isClicked }) => (isClicked ? COLORS.bg : COLORS.text)};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: ${FONT_SIZES['subtitle-1']};
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    color: ${COLORS.bg};
    background-color: ${COLORS['primary-hov']};
  }
`;

const Content = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  align-self: stretch;

  border-radius: 1rem;
  border: 1px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
`;

const Item = styled.div`
  display: flex;
  padding: 1rem 1.5rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  border-radius: 1rem;
  border: 1px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Rank = styled.div<{ index: number }>`
  display: flex;
  padding: 0.375rem 1rem;
  justify-content: center;
  align-items: center;
  align-self: center;
  gap: 0.625rem;

  color: rgba(0, 0, 0, 0.5);

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: ${FONT_SIZES['subtitle-1']};
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  border-radius: 0.5rem;
  background: ${({ index }) => {
    if (index === 0) return COLORS.yellow;
    else if (index === 1) return COLORS['gray-4'];
    else if (index === 2) return COLORS.red;
    else return COLORS.bg;
  }};

  border: ${({ index }) => (index > 2 ? '1px solid #EAEAEA' : 'none')};
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Grade = styled.img`
  width: 1.125rem;
  height: 1.125rem;
`;

const Name = styled.h5`
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Right = styled.div`
  color: ${COLORS['gray-3']};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: ${FONT_SIZES['subtitle-1']};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export {
  Wrapper,
  Title,
  Body,
  Nav,
  Button,
  Content,
  List,
  Item,
  Left,
  Rank,
  Right,
  Info,
  Grade,
  Name,
};
