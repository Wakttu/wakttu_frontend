import { selectModal } from '@/redux/modal/modalSlice';
import {
  Container,
  Overlay,
  Text,
  CButton,
  ConfirmButton,
  ConfrimText,
  CancleButton,
  CancleText,
} from '@/styles/game/ExitModal.styles';
import { useSelector } from 'react-redux';

interface Props {
  onConfirm: (src: string) => Promise<void>;
  onCancle: () => void;
}

const RouteModal = ({ onConfirm, onCancle }: Props) => {
  const modal = useSelector(selectModal);
  return (
    <Overlay>
      <Container>
        <Text>현재 방에서 나가집니다. 괜찮으신가요?</Text>
        <CButton>
          <ConfirmButton onClick={() => onConfirm(modal.data.src)}>
            <ConfrimText>확인</ConfrimText>
          </ConfirmButton>
          <CancleButton onClick={onCancle}>
            <CancleText>취소</CancleText>
          </CancleButton>
        </CButton>
      </Container>
    </Overlay>
  );
};

export default RouteModal;
