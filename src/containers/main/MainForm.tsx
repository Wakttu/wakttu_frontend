import { MainForm } from '@/components';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@/redux/modal/modalSlice';
import { client } from '@/services/api';
import {
  clearUserInfo,
  selectUserId,
  setUserInfo,
} from '@/redux/user/userSlice';
import { socket } from '@/services/socket/socket';

const MainFormContainer = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const userId = useSelector(selectUserId);
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const response = await client.get('/test');
      const data = response.data;
      if (data.user) dispatch(setUserInfo(data.user));
      else dispatch(clearUserInfo());
    };
    checkLogin();
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      setIsLogined(true);
    } else setIsLogined(false);
  }, [userId]);

  const onModal = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(openModal('MAIN_MODAL'));
  };

  const start = (e: MouseEvent<HTMLElement>) => {
    if (isLogined) {
      e.stopPropagation();
      if (!socket.connected) socket.connect();
      setTimeout(() => {
        router.push('/roomlist');
      }, 200);
    }
  };

  const logout = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    await client.get('auth/logout');
    dispatch(clearUserInfo());
    return;
  };

  return (
    <MainForm
      isLogined={isLogined}
      onModal={onModal}
      start={start}
      logout={logout}
    />
  );
};

export default MainFormContainer;
