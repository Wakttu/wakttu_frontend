import { RoomNav as CRoomNav } from '@/components';
import { clearGame, selectHost, setGame } from '@/redux/game/gameSlice';
import { openModal } from '@/redux/modal/modalSlice';
import {
  clearRoomInfo,
  selectRoomId,
  setRoomInfo,
} from '@/redux/roomInfo/roomInfoSlice';
import { selectUserInfo } from '@/redux/user/userSlice';
import { exit, socket } from '@/services/socket/socket';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RoomNav = () => {
  const roomId = useSelector(selectRoomId) as string;
  const user = useSelector(selectUserInfo);
  const host = useSelector(selectHost);
  const dispatch = useDispatch();
  const router = useRouter();

  const onExit = useCallback(async () => {
    exit(roomId);
    await router.push('/roomlist');
    dispatch(clearRoomInfo());
    dispatch(clearGame());
  }, [dispatch, roomId, router]);

  const onUpdate = () => {
    if (host !== user.id) return;
    dispatch(openModal('UPDATE_ROOM'));
  };

  const onChangeHost = () => {
    if (host !== user.id) return;
    dispatch(openModal('CHANGE_HOST'));
  };

  useEffect(() => {
    socket.on('exit', (data) => {
      const { roomInfo, game } = data;
      dispatch(setRoomInfo(roomInfo));
      dispatch(setGame(game));
    });

    socket.on('kick helper', async () => {
      await router.push('roomlist');
      dispatch(clearRoomInfo());
      dispatch(clearGame());

      setTimeout(() => socket.emit('kick helper', roomId), 200);
    });

    return () => {
      socket.off('exit');
      socket.off('kick helper');
    };
  }, [dispatch, router]);

  return (
    <CRoomNav
      onExit={onExit}
      onChangeHost={onChangeHost}
      onUpdate={onUpdate}
      host={user.id === host}
    />
  );
};

export default RoomNav;
