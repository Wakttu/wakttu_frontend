import { UpdateRoom as CUpdateRoom } from '@/components';
import { cleanTitle } from '@/modules/Slang';
import { closeModal, selectModal } from '@/redux/modal/modalSlice';
import { selectRoomInfo } from '@/redux/roomInfo/roomInfoSlice';
import { Room, updateRoom } from '@/services/socket/socket';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface RoomInfo {
  title: string;
  password?: string | undefined;
  total: number;
  type: number;
  round: number;
  time: number;
  option: string[];
}

const UpdateRoom = () => {
  const roomInfo = useSelector(selectRoomInfo);
  const modal = useSelector(selectModal);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [room, setRoom] = useState<Room>(roomInfo);

  const [isDown, setDown] = useState<boolean[]>([false, false]);

  const onDropdown = (index: number) => {
    let copy = [...isDown];
    copy[index] = !copy[index];
    setDown(copy);
  };

  const onRoomInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === 'number') {
      // 공백일 경우 early return
      if (value === '') {
        setRoom((prev) => ({ ...prev, [name]: value }));
        return;
      }

      let onlyNumber = parseInt(value, 10);

      // name에 따라 min과 max 값 설정
      const min = name === 'round' ? 2 : 2;
      const max = name === 'round' ? 30 : 8;

      // onlyNumber가 숫자가 아니거나 범위를 벗어날 경우 min 또는 max로 설정
      if (Number.isNaN(onlyNumber)) {
        onlyNumber = min;
      } else if (onlyNumber < min) {
        onlyNumber = min;
      } else if (onlyNumber > max) {
        onlyNumber = max;
      }

      setRoom((prev) => ({ ...prev, [name]: onlyNumber }));
      return;
    }

    setRoom((prev) => ({ ...prev, [name]: value }));
  };

  const onSelect = (name: string, value: any) => {
    if (name === 'option') {
      let copy = [];
      if (room.option!.indexOf(value) >= 0) {
        copy = room.option!.filter((item) => item !== value);
      } else {
        copy = [...(room.option as string[])];
        copy!.push(value);
      }
      setRoom((prev) => {
        return { ...prev, option: copy };
      });
    } else if (name === 'type') {
      setRoom((prev) => {
        return {
          ...prev,
          [name]: value,
          round: value === 2 ? 10 : 6,
          option: [],
        };
      });
    } else {
      setRoom((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const onCancle = () => {
    dispatch(closeModal());
  };

  const onUpdate = () => {
    if (!room.round) {
      alert('라운드 값이 비어있습니다.');
      return;
    }
    if (!room.total) {
      alert('플레이어 수 값이 비어있습니다.');
      return;
    }

    dispatch(closeModal());
    let { id, users, ...roomInfo } = room;
    roomInfo.title = cleanTitle(roomInfo.title as string);
    updateRoom({ roomId: id, data: roomInfo });
  };

  useEffect(() => {
    const offModal = (e: any) => {
      if (
        modal.modalType === 'UPDATE_ROOM' &&
        modal.open &&
        ref &&
        !ref.current?.contains(e.target as Node)
      ) {
        dispatch(closeModal());
      }
    };
    document.addEventListener('mousedown', offModal);

    return () => {
      document.removeEventListener('mousedown', offModal);
    };
  });

  return (
    <CUpdateRoom
      modalRef={ref}
      isDown={isDown}
      onDropdown={onDropdown}
      roomInfo={room}
      onRoomInfo={onRoomInfo}
      onSelect={onSelect}
      onCancle={onCancle}
      onUpdate={onUpdate}
    />
  );
};

export default UpdateRoom;
