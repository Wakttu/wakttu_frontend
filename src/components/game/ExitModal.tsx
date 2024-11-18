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

interface Props {
  onConfirm: () => void;
  onCancle: () => void;
}

const ExitModal = ({ onConfirm, onCancle }: Props) => {
  return (
    <Overlay>
      <Container>
        <Text>정말로 나가실 건가요?</Text>
        <CButton>
          <ConfirmButton onClick={onConfirm}>
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

export default ExitModal;
