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

const CCreateRoom = styled('div')`
  display: flex;
  width: 22rem;

  padding: 1.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;

  border-radius: 2rem;
  border: 2px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;

const LabelWithIcon = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const CreateIcon = styled('img')`
  width: 1.5rem;
  height: 1.5rem;
`;

const CreateLabel = styled('h5')`
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;

const CCreate = styled('div')`
  display: flex;
  justify-content: space-between;

  gap: 1rem;
`;

const CLabel = styled('span')`
  display: flex;
  width: 4rem;
  height: 2.6875rem;
  flex-direction: column;
  justify-content: center;

  white-space: nowrap;
  ${COLORS.text}

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: ${FONT_SIZES['body-2']};
`;

const CInput = styled('input')`
  display: flex;
  width: 12.625rem;
  padding: 0.75rem 1rem;
  align-items: center;
  gap: 0.625rem;

  border-radius: 0.5rem;
  border: 1px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};

  color: ${COLORS['gray-2']};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: ${FONT_SIZES['body-1']};
`;

const CheckBox = styled('div')`
  display: flex;
  align-items: center;
  gap: 1rem;

  input {
    display: none;
  }
`;

const CCheck = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CheckIcon = styled('img')`
  width: 1.25rem;
  height: 1.25rem;

  cursor: pointer;
`;

const Dropdown = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  width: 12.5rem;
  padding: 0.625rem 0;

  border-radius: 0.5rem;
  border: 1px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};

  cursor: pointer;

  & > span {
    margin-left: 1rem;
  }
`;

const DropdownItem = styled('li')`
  width: 12.5rem;

  padding: 0.375rem 1rem;
  text-align: left;
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: ${FONT_SIZES['body-1']};

  cursor: pointer;

  &:first-of-type {
    margin-top: 0.75rem;
  }

  &:hover {
    background-color: ${COLORS['gray-4']};
  }
`;

const DropdownLine = styled('img')<{ isopen: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;

  cursor: pointer;

  transform: ${({ isopen }) => (isopen ? 'rotateX(180deg)' : 'rotateX(0deg)')};
  transition: transform 0.3s ease;
`;

interface SelectedProps {
  tooltip?: string;
}

const Selected = styled('span')<SelectedProps>`
  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: ${FONT_SIZES['body-1']};

  position: relative;
  cursor: ${(props) =>
    props.tooltip ? 'pointer' : 'default'}; /* tooltip이 있을 때만 포인터 */

  ${(props) =>
    props.tooltip &&
    `
    &:hover::after {
      content: '${props.tooltip}';
      visibility: visible;
      opacity: 1;
      position: absolute;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px;
      bottom: 150%; /* 툴팁이 위에 표시되도록 */
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
      white-space: nowrap;
      font-size: 12px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    /* 화살표 추가 */
    &:hover::before {
      content: ''; /* 화살표 */
      position: absolute;
      bottom: 100%; /* 툴팁 바로 아래에 화살표 */
      left: 50%;
      transform: translateX(-50%);
      border-width: 5px;
      border-style: solid;
      border-color: black transparent transparent transparent;
      z-index: 1;
      visibility: visible;
      opacity: 1;
    }

    &:hover::after, &:hover::before {
      visibility: visible;
      opacity: 1;
    }
  `}
`;

const CButton = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 0.75rem;
`;

const ConfirmButton = styled('button')`
  display: flex;
  padding: 1rem 2.625rem;
  justify-content: center;
  align-items: center;

  flex: 1 0 0;

  border-radius: 0.5rem;
  border: none;
  background: ${COLORS.primary};

  cursor: pointer;

  &:hover {
    background: ${COLORS['primary-hov']};
  }
`;

const CancleButton = styled('button')`
  display: flex;
  width: 5rem;

  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;
  border: 1px solid var(--Outline-Black, rgba(0, 0, 0, 0.1));
  background: ${COLORS['gray-4']};

  cursor: pointer;

  &:hover {
    background: ${COLORS['gray-5']};
  }
`;

const ButtonText = styled('span')<{ $color?: boolean }>`
  color: ${({ $color }) => ($color ? COLORS['gray-1'] : COLORS.bg)};
  text-align: center;
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: ${FONT_SIZES['subtitle-1']};
`;

export {
  Modal,
  CCreateRoom,
  LabelWithIcon,
  CreateIcon,
  CreateLabel,
  CCreate,
  CCheck,
  CheckBox,
  CheckIcon,
  CLabel,
  CInput,
  Dropdown,
  DropdownItem,
  DropdownLine,
  Selected,
  CButton,
  ButtonText,
  ConfirmButton,
  CancleButton,
};
