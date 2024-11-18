import GameNav from '@/containers/roomlist/GameNav';
import List from '@/containers/roomlist/List';
import RoomDesc from '@/containers/roomlist/RoomDesc';
import Header from '@/containers/common/Header';
import { Container } from '@/styles/common/Layout';
import Chat from '@/containers/roomlist/Chat';
import {
  WrapRoomList,
  LeftWrapper,
  RightWrapper,
  Copyright,
} from '@/styles/roomList/RoomList';
import PlayerInfo from '@/containers/roomlist/PlayerInfo';
import { useDispatch, useSelector } from 'react-redux';
import { selectModal } from '@/redux/modal/modalSlice';
import CreateRoom from '@/containers/roomlist/CreateRoom';
import PasswordModal from '@/containers/roomlist/PasswordModal';
import UserList from '@/containers/roomlist/UserList';
import { useEffect, useState } from 'react';
import { enter, socket } from '@/services/socket/socket';
import { setRoomInfo } from '@/redux/roomInfo/roomInfoSlice';
import { setGame } from '@/redux/game/gameSlice';
import { useRouter } from 'next/router';
import useSound from '@/hooks/useSound';
import { selectBgmVolume } from '@/redux/audio/audioSlice';

const RoomList = () => {
  const modal = useSelector(selectModal);
  const [toggle, setToggle] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const bgmVolume = useSelector(selectBgmVolume);
  const sound = useSound('/assets/bgm/lossy/ui_main.webm', bgmVolume, 0, true);

  useEffect(() => {
    const handleDisconnect = () => {
      router.replace('/');
    };

    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('disconnect', handleDisconnect);
    };
  }, [router]);

  useEffect(() => {
    if (sound) sound.play();
  }, [sound]);

  useEffect(() => {
    socket.on('createRoom', (data) => {
      enter(data);
    });

    socket.on('enter', async (data: any) => {
      if (data) {
        const { roomInfo, game } = data;
        await dispatch(setRoomInfo(roomInfo));
        await dispatch(setGame(game));
        router.push('/room');
      }
    });

    return () => {
      socket.off('createRoom');
      socket.off('enter');
    };
  }, [dispatch, router]);

  return (
    <Container>
      <Header />
      <WrapRoomList>
        <LeftWrapper>
          {!toggle ? <UserList /> : <RoomDesc />}
          <PlayerInfo />
          <Copyright>
            © copyright WAKTTU.
            <br />
            왁뚜는 왁타버스에서 제공하는 공식 콘텐츠가 아닙니다.
          </Copyright>
        </LeftWrapper>
        <RightWrapper>
          <GameNav setToggle={setToggle} />
          <List setToggle={setToggle} />
          <Chat />
        </RightWrapper>
      </WrapRoomList>
      {modal.modalType === 'CREATE_ROOM' && modal.open && <CreateRoom />}
      {modal.modalType === 'PASSWORD' && modal.open && <PasswordModal />}
    </Container>
  );
};

export default RoomList;
