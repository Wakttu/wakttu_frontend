import { Container } from '@/styles/common/Layout';
import Header from '@/containers/common/Header';
import { LeftFooter, RightWrapper, WrapRoom } from '@/styles/room/Room';
import { LeftWrapper, Copyright } from '@/styles/room/Room';
import RoomNav from '@/containers/room/RoomNav';
import Chat from '@/containers/room/Chat';
import Ready from '@/containers/room/Ready';
import PlayerList from '@/containers/room/PlyaerList';
import RoomDesc from '@/containers/room/RoomDesc';
import { useDispatch, useSelector } from 'react-redux';
import { selectModal } from '@/redux/modal/modalSlice';
import UpdateRoom from '@/containers/room/UpdateRoom';
import KickModal from '@/containers/room/KickModal';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { socket } from '@/services/socket/socket';
import { selectRoomInfo, setRoomInfo } from '@/redux/roomInfo/roomInfoSlice';
import { setGame } from '@/redux/game/gameSlice';
import { selectBgmVolume } from '@/redux/audio/audioSlice';
import useSound from '@/hooks/useSound';
import Result from '@/containers/room/Result';
import ChangeHost from '@/containers/room/HostModal';

const Room = () => {
  const modal = useSelector(selectModal);
  const router = useRouter();
  const dispatch = useDispatch();
  const roomInfo = useSelector(selectRoomInfo);
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
    if (roomInfo.start) {
      socket.emit('start', roomInfo.id);
    }

    socket.on('start', (data) => {
      const { roomInfo, game } = data;
      dispatch(setRoomInfo(roomInfo));
      dispatch(setGame(game));
    });

    return;
  }, [dispatch, roomInfo.id, roomInfo.start]);

  return (
    <Container>
      <Header />
      <WrapRoom>
        <LeftWrapper>
          <RoomDesc />
          <LeftFooter>
            <Ready />
            <Copyright>
              &copy; 2024-2025 WAKTTU
              <br />
              왁뚜는 왁타버스에서 제공하는 공식 콘텐츠가 아닙니다.
            </Copyright>
          </LeftFooter>
        </LeftWrapper>
        <RightWrapper>
          <RoomNav />
          <PlayerList />
          <Chat />
        </RightWrapper>
      </WrapRoom>
      {modal.modalType === 'CHANGE_HOST' && modal.open && <ChangeHost />}
      {modal.modalType === 'UPDATE_ROOM' && modal.open && <UpdateRoom />}
      {modal.modalType === 'KICK' && modal.open && <KickModal />}
      {modal.modalType === 'RESULT' && modal.open && <Result />}
    </Container>
  );
};

export default Room;
