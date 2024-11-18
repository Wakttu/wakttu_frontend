import { Header as CHeader, Option } from '@/components';
import { getIcon } from '@/modules/UserInfo';
import { selectVolume, setVolume as setAudio } from '@/redux/audio/audioSlice';
import { clearGame, selectGame } from '@/redux/game/gameSlice';
import {
  closeModal,
  openModal,
  selectModal,
  setDataModal,
} from '@/redux/modal/modalSlice';
import { clearRoomInfo, selectRoomInfo } from '@/redux/roomInfo/roomInfoSlice';
import { selectUserInfo } from '@/redux/user/userSlice';
import { exit } from '@/services/socket/socket';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RouteModal from './RouteModal';

const Header = () => {
  const [isConnected, setIsConnected] = useState(false);
  const user = useSelector(selectUserInfo);
  const game = useSelector(selectGame);
  const roomInfo = useSelector(selectRoomInfo);
  const router = useRouter();
  const dispatch = useDispatch();
  const [icon, setIcon] = useState(getIcon(0, undefined));
  const modal = useSelector(selectModal);
  const audio = useSelector(selectVolume);
  const [volume, setVolume] = useState({
    bgmVolume: 0.5,
    effectVolume: 0.5,
    voiceVolume: 0.5,
  });

  const goRouter = useCallback(
    async (src: string = '/') => {
      const path = router.asPath;
      if (src === path) return;
      if (game.host !== '' || roomInfo.id) {
        if (path === '/room') {
          dispatch(openModal('ROUTE'));
          dispatch(setDataModal({ src }));
        } else {
          await router.replace(src);
          await exit(roomInfo.id as string);
          await dispatch(clearGame());
          await dispatch(clearRoomInfo());
        }
      } else {
        await router.replace(src);
      }
    },
    [dispatch, game.host, roomInfo.id, router]
  );

  const onExit = useCallback(
    async (src: string) => {
      await router.replace(src);
      await exit(roomInfo.id as string);
      await dispatch(clearGame());
      await dispatch(clearRoomInfo());
      await dispatch(closeModal());
    },
    [dispatch, roomInfo.id, router]
  );

  const onModal = () => {
    dispatch(openModal('OPTION'));
  };

  const offModal = () => {
    dispatch(closeModal());
  };

  const onBgmChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setVolume({ ...volume, bgmVolume: Number(value) });
  };

  const onEffectChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setVolume({ ...volume, effectVolume: Number(value) });
  };

  const onVoiceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setVolume({ ...volume, voiceVolume: Number(value) });
  };

  const onClick = () => {
    dispatch(setAudio(volume));
    offModal();
  };

  useEffect(() => {
    setIsConnected(true);
  }, []);

  useEffect(() => {
    setVolume(audio);
  }, [audio]);

  useEffect(() => {
    setIcon(
      getIcon(
        user.score ? user.score : 0,
        user.provider ? user.provider : undefined
      )
    );
  }, [user]);

  return (
    <>
      {isConnected && (
        <CHeader user={user} goRouter={goRouter} onModal={onModal} />
      )}
      {modal.modalType === 'OPTION' && modal.open && (
        <Option
          audio={volume}
          offModal={offModal}
          onClick={onClick}
          onBgmChange={onBgmChange}
          onEffectChange={onEffectChange}
          onVoiceChange={onVoiceChange}
        />
      )}
      {modal.modalType === 'ROUTE' && modal.open && (
        <RouteModal onConfirm={onExit} onCancle={offModal} />
      )}
    </>
  );
};

export default Header;
