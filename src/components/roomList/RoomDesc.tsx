import {
  CRoomDesc,
  WrapRoomTitle,
  WrapGameInfo,
  GameInfo,
  RoomInfo,
  WrapInfo,
  Info,
  WrapMod,
  Mod,
  ModText,
  WatingLarge,
  WatingText,
  JoinButton,
  JoinText,
} from '@/styles/roomList/RoomDesc';
import { RoomNumber } from '@/components';
import { Room } from '@/services/socket/socket';
import { getR2URL } from '@/services/api';

interface Props {
  roomInfo: Room;
  onEnter?: () => void;
}

const RoomDesc = ({ roomInfo, onEnter }: Props) => {
  return (
    <CRoomDesc>
      <WrapRoomTitle>
        <RoomNumber number={roomInfo.idx as number} />
        <h5>{roomInfo.title}</h5>
      </WrapRoomTitle>
      <WrapGameInfo>
        <GameInfo src={getR2URL('/assets/game-info.png')} />
        <RoomInfo>
          <WrapInfo>
            <Info $variant="title">플레이어</Info>
            <Info $variant="title">라운드 수</Info>
            <Info $variant="title">라운드 시간</Info>
          </WrapInfo>
          <WrapInfo>
            <Info>
              {roomInfo.users?.length}/{roomInfo.total}명
            </Info>
            <Info>{roomInfo.round}</Info>
            <Info>{roomInfo.time! / 1000}초</Info>
          </WrapInfo>
        </RoomInfo>
      </WrapGameInfo>
      <WrapMod>
        <Mod>
          <ModText>
            {roomInfo.option?.length ? roomInfo.option.join(', ') : '-'}
          </ModText>
        </Mod>
        <WatingLarge $start={roomInfo.start}>
          <WatingText>{roomInfo.start ? '게임 중' : '대기 중'}</WatingText>
        </WatingLarge>
      </WrapMod>
      {onEnter && (
        <JoinButton onClick={roomInfo.start ? undefined : onEnter}>
          <JoinText>입장하기</JoinText>
        </JoinButton>
      )}
    </CRoomDesc>
  );
};

export default RoomDesc;
