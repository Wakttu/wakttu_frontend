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
  TitleText,
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
        <TitleText>{roomInfo.title}</TitleText>
      </WrapRoomTitle>
      <WrapGameInfo>
        {roomInfo.type === 0 ? (
          <GameInfo src={getR2URL('/assets/game-info.png')} alt="끝말잇기 배경 이미지" />
        ) : (
          ''
        )}
        {roomInfo.type === 1 ? (
          <GameInfo src={getR2URL('/assets/game-info-2.png')} alt="추억의 쿵쿵따 배경 이미지" />
        ) : (
          ''
        )}
        {roomInfo.type === 2 ? (
          <GameInfo src={getR2URL('/assets/game-info-3.png')} alt="왁타! 골든벨 배경 이미지" />
        ) : (
          ''
        )}
        {roomInfo.type === 3 ? (
          <GameInfo src={getR2URL('/assets/game-info-3.png')} alt="음악 맞추기 배경 이미지" />
        ) : (
          ''
        )}
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
            <Info>{roomInfo.type === 2 ? '30' : roomInfo.time! / 1000}초</Info>
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
          <JoinText>{roomInfo.start ? '입장 불가' : '입장 하기'}</JoinText>
        </JoinButton>
      )}
    </CRoomDesc>
  );
};

export default RoomDesc;
