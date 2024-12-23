import { List as CList } from '@/components';
import { selectFilter } from '@/redux/filter/filterSlice';
import { setRoomInfo } from '@/redux/roomInfo/roomInfoSlice';
import { getRoomList, Room, socket } from '@/services/socket/socket';
import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const List = ({ setToggle }: any) => {
  const [roomList, setRoomList] = useState<Room[]>([]);

  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const setRoomDesc = (data: any, e: MouseEvent) => {
    e.stopPropagation();
    dispatch(setRoomInfo(data));
    setToggle(true);
  };

  const onToggle = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setToggle(false);
  };

  useEffect(() => {
    getRoomList();

    const interval = setInterval(() => {
      getRoomList();
    }, 5000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
  }, []);

  useEffect(() => {
    const copy = [...roomList].sort((a, b) =>
      filter.time === 'desc' ? a.idx! - b.idx! : b.idx! - a.idx!
    );
    setRoomList(copy);
  }, [filter.time]);

  useEffect(() => {
    const handleRoomList = (data: any) => {
      const copy = [...data]
        .sort((a, b) =>
          filter.time === 'desc' ? a.idx! - b.idx! : b.idx! - a.idx!
        )
        .filter((ele) => ele.users.length !== 0);

      setRoomList(copy);
    };
    socket.on('roomList', handleRoomList);

    return () => {
      socket.off('roomList', handleRoomList);
    };
  }, [filter.time]);

  return (
    <CList
      roomList={roomList}
      onClick={setRoomDesc}
      filter={filter}
      onToggle={onToggle}
    />
  );
};

export default List;
