import { RoomNumber } from '@/components';
import { roomInfoSlice } from '@/redux/roomInfo/roomInfoSlice';
import { getR2URL } from '@/services/api';
import { Room } from '@/services/socket/socket';
import {
  CItem,
  CList,
  Item,
  RoomNameCount,
  RoomName,
  RoomCount,
  Summary,
  RoomInfo,
  SemiText,
  MediumText,
  RoomGame,
  Status,
  Lock,
} from '@/styles/roomList/List';
import { MouseEvent } from 'react';

interface Props {
  roomList: Room[];
  onClick: (data: any, e: MouseEvent) => void;
  onToggle: (e: MouseEvent<HTMLDivElement>) => void;
  filter: {
    time: string | undefined;
    start: boolean | undefined;
    type: number | undefined;
    keyword: string | undefined;
  };
}

type RoomType = Record<number, string>;
const roomType: RoomType = {
  0: '끝말잇기',
  1: '쿵쿵따',
  2: '왁타골든벨',
  3: '왁타레코드',
  4: '구름',
};

const haveRoundTime = (type: number) => {
  return type === 0 || type === 1;
};

const List = ({ roomList, onClick, filter, onToggle }: Props) => {
  const checkFilter = (room: Room) => {
    const { type, start, title } = room;
    return (
      (filter.type === type || filter.type === undefined) &&
      (filter.start === start || filter.start === undefined) &&
      (filter.keyword === undefined ||
        (title as string).includes(filter.keyword))
    );
  };

  return (
    <CList onClick={onToggle}>
      <CItem>
        {roomList.map((room) => {
          if (checkFilter(room))
            return (
              <Item key={room.id} onClick={(e) => onClick(room, e)}>
                <Summary>
                  <RoomNumber number={room.idx as number} />
                  <RoomInfo>
                    <RoomNameCount>
                      <RoomName>{room.title}</RoomName>
                      <RoomCount>
                        <SemiText>{room.users.length}</SemiText>
                        <SemiText $color={true}>/</SemiText>
                        <SemiText>{room.total}</SemiText>
                      </RoomCount>
                      {room.password && (
                        <Lock
                          src={getR2URL('/assets/icons/lock.svg')}
                          alt="자물쇠 아이콘"
                        />
                      )}
                    </RoomNameCount>
                    <RoomGame>
                      <SemiText>{roomType[room.type as number]}</SemiText>
                      <MediumText $color={true}>라운드</MediumText>
                      <MediumText>{room.round}</MediumText>
                      {haveRoundTime(room.type as number) && (
                        <>
                          <MediumText $color={true}>시간</MediumText>
                          <MediumText>{room.time! / 1000}초</MediumText>
                        </>
                      )}
                    </RoomGame>
                  </RoomInfo>
                </Summary>
                <Status $status={room.start ? 'start' : undefined}>
                  {room.start ? '게임 중' : '대기 중'}
                </Status>
              </Item>
            );
        })}
      </CItem>
    </CList>
  );
};

export default List;
