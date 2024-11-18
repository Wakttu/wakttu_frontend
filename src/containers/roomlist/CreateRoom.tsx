import { CreateRoom as CCreateRoom } from '@/components';
import { cleanTitle } from '@/modules/Slang';
import { closeModal, selectModal } from '@/redux/modal/modalSlice';
import { createRoom } from '@/services/socket/socket';
import { prepareAutoBatched } from '@reduxjs/toolkit';
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

const CreateRoom = () => {
  const modal = useSelector(selectModal);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [room, setRoom] = useState<RoomInfo>({
    title: '왁뚜 생활',
    password: undefined,
    total: 8,
    type: 0,
    round: 6,
    time: 60000,
    option: [],
  });

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
      let copy;
      if (room.option.indexOf(value) >= 0) {
        copy = room.option.filter((item) => item !== value);
      } else {
        copy = room.option;
        copy.push(value);
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

  const onCreate = () => {
    if (!room.round) {
      alert('라운드 값이 비어있습니다.');
      return;
    }
    if (!room.total) {
      alert('플레이어 수 값이 비어있습니다.');
      return;
    }

    dispatch(closeModal());
    let roomInfo = {
      ...room,
      title: cleanTitle(room.title),
    };
    createRoom(roomInfo);
  };

  useEffect(() => {
    const offModal = (e: any) => {
      if (
        modal.modalType === 'CREATE_ROOM' &&
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
    <CCreateRoom
      modalRef={ref}
      isDown={isDown}
      onDropdown={onDropdown}
      roomInfo={room}
      onRoomInfo={onRoomInfo}
      onSelect={onSelect}
      onCancle={onCancle}
      onCreate={onCreate}
    />
  );
};

export default CreateRoom;
