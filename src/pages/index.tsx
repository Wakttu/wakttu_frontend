import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Auth from '@/containers/auth/Auth';
import SocketManager from '@/services/socketManager';
import { selectUserId } from '@/redux/user/userSlice';
import { LoginedMain } from '@/components/index';

const Main = () => {
  const userId = useSelector(selectUserId);
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    if (userId) setIsLogined(true);
    if (!userId) setIsLogined(false);
  }, [userId]);

  return (
    <div>
      <SocketManager />
      {isLogined ? <LoginedMain isLogined={isLogined} /> : <Auth />}
    </div>
  );
};

export default Main;
