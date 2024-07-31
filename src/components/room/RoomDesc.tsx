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
} from '@/styles/roomList/RoomDesc';
import { RoomNumber } from '@/components';
import { Room } from '@/services/socket/socket';

interface Props {
  roomInfo: Room;
}

const RoomDesc = ({ roomInfo }: Props) => {
  return (
    <CRoomDesc>
      <WrapRoomTitle>
        <RoomNumber number={roomInfo.idx as number} />
        <h5>방제에요</h5>
      </WrapRoomTitle>
      <WrapGameInfo>
        <GameInfo src="/assets/game-info.png" />
        <RoomInfo>
          <WrapInfo>
            <Info $variant="title">플레이어</Info>
            <Info $variant="title">라운드 수</Info>
            <Info $variant="title">라운드 시간</Info>
          </WrapInfo>
          <WrapInfo>
            <Info>
              {roomInfo.users.length}/{roomInfo.total}명
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
        <WatingLarge>
          <WatingText>대기 중</WatingText>
        </WatingLarge>
      </WrapMod>
    </CRoomDesc>
  );
};

export default RoomDesc;
