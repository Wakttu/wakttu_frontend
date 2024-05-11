import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectUserId } from '@/redux/user/userSlice';
import { Auth, LoginedMain } from '@/components/index';

const Main = () => {
  const userId = useSelector(selectUserId);
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    if (userId) setIsLogined(true);
  }, [userId]);
  return <div>{isLogined ? <LoginedMain isLogined={isLogined} /> : <Auth />}</div>;
};

export default Main;
