import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import io, { Socket } from 'socket.io-client';

import { selectUserId } from '@/redux/user/userSlice';
import { API_URL } from '@/services/api';

const ConnectSocket = () => {
  const userId = useSelector(selectUserId);
  const router = useRouter();

  const socketRef = useRef<Socket | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    if (userId) {
      if (!socketRef.current) {
        const socket = io(`${API_URL}/wakttu`);
        socketRef.current = socket;

        socket.on('connect', () => {
          setSocketConnected(true);
          console.log('서버와 연결되었습니다.');
        });
      }
    }

    if (!userId) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;

        setSocketConnected(false);
      }
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [userId]);

  if (socketConnected) router.push('/roomlist');

  return null;
};

export default ConnectSocket;
