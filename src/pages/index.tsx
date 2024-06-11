import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Auth from '@/containers/auth/Auth';
import { selectUserId } from '@/redux/user/userSlice';

const Main = () => {
  const userId = useSelector(selectUserId);
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    if (userId) setIsLogined(true);
    if (!userId) setIsLogined(false);
  }, [userId]);

  return !isLogined && <Auth />;
};

export default Main;
