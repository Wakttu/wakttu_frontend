import { R2_URL } from '@/services/api';
import { Room } from '@/services/socket/socket';
import {
  Button,
  ButtonText,
  CButton,
  CHeader,
  CTitle,
  ExitButton,
  ExitIcon,
  Index,
  Title,
} from '@/styles/last/Header';

interface Props {
  roomInfo: Room;
}

const Header = ({ roomInfo }: Props) => {
  return (
    <CHeader>
      <CButton>
        <Button>
          <ButtonText>사전</ButtonText>
        </Button>
        <Button>
          <ButtonText>방설정</ButtonText>
        </Button>
        <Button>
          <ButtonText>도움말</ButtonText>
        </Button>
      </CButton>
      <CTitle>
        <Index>[ {roomInfo.idx} ]</Index>
        <Title>{roomInfo.title}</Title>
      </CTitle>
      <CButton>
        <ExitButton>
          <ButtonText>나가기</ButtonText>
          <ExitIcon src={R2_URL + '/assets/icons/game-exit.svg'} />
        </ExitButton>
      </CButton>
    </CHeader>
  );
};

export default Header;
