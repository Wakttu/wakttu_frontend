import HostModal from '@/components/room/HostModal';
import { closeModal } from '@/redux/modal/modalSlice';
import { selectRoomId, selectRoomUsers } from '@/redux/roomInfo/roomInfoSlice';
import { selectUserId } from '@/redux/user/userSlice';
import { socket } from '@/services/socket/socket';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ChangeHost = () => {
  const roomId = useSelector(selectRoomId);
  const id = useSelector(selectUserId);
  const roomUsers = useSelector(selectRoomUsers);
  const [isDown, setDown] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<{ id: string; name: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && roomUsers)
      setData(roomUsers.filter((user: { id: string }) => user.id !== id));
  }, [id, roomUsers]);

  const onDropdown = () => {
    setDown((isDown) => !isDown);
  };

  const onSelect = ({ id, name }: { id: string; name: string }) => {
    setSelected({ id, name });
  };

  const onConfirm = useCallback(() => {
    if (selected && roomUsers.some((user: any) => user.id === selected.id)) {
      socket.emit('host', { roomId, userId: selected.id });
    }
    dispatch(closeModal());
    setSelected(undefined);
  }, [dispatch, roomId, selected, roomUsers]);

  const onCancle = () => {
    dispatch(closeModal());
    setSelected(undefined);
  };

  return (
    <HostModal
      data={data}
      isDown={isDown}
      selected={selected}
      onSelect={onSelect}
      onDropdown={onDropdown}
      onConfirm={onConfirm}
      onCancle={onCancle}
    />
  );
};

export default ChangeHost;
