import { BHeader } from '@/components';
import { setAchieve } from '@/redux/achieve/achieveSlice';
import { selectVolume, setVolume as setAudio } from '@/redux/audio/audioSlice';
import { clearGame } from '@/redux/game/gameSlice';
import { clearRoomInfo, selectRoomInfo } from '@/redux/roomInfo/roomInfoSlice';
import { selectUserInfo } from '@/redux/user/userSlice';
import { updateStat, updateStatLocal } from '@/services/api';
import { exit } from '@/services/socket/socket';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector(selectUserInfo);
  const roomInfo = useSelector(selectRoomInfo);
  const router = useRouter();
  const dispatch = useDispatch();

  const exitGame = useCallback(async () => {
    await router.push('/roomlist');
    dispatch(clearRoomInfo());
    dispatch(clearGame());
    exit(roomInfo.id as string);
    const achieves =
      user.provider === 'waktaverse.games'
        ? await updateStat('EXIT')
        : await updateStatLocal('EXIT');
    if (achieves) dispatch(setAchieve(achieves));
  }, [dispatch, roomInfo.id, router, user.provider]);

  return <BHeader roomInfo={roomInfo} exit={exitGame} />;
};

export default Header;
