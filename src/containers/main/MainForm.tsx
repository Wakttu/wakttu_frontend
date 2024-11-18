import { MainForm } from '@/components';
import { useRouter } from 'next/router';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@/redux/modal/modalSlice';
import { client } from '@/services/api';
import {
  clearUserInfo,
  selectUserId,
  selectUserInfo,
  setUserInfo,
} from '@/redux/user/userSlice';
import { socket } from '@/services/socket/socket';

const MainFormContainer = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector(selectUserInfo);
  const userId = useSelector(selectUserId);
  const [isLogined, setIsLogined] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isFull, setIsFull] = useState(false);

  // 로그인 체크 및 소켓 연결 관리
  useEffect(() => {
    const checkLoginAndConnect = async () => {
      try {
        const response = await client.get('/test');
        const data = response.data;

        if (data.user) {
          dispatch(setUserInfo(data.user));
        } else {
          dispatch(clearUserInfo());
          if (isConnected) {
            socket.disconnect();
            setIsConnected(false);
          }
        }
      } catch (error) {
        console.error('Login check or socket connection error:', error);
        dispatch(clearUserInfo());
        socket.disconnect();
        setIsConnected(false);
      }
    };

    checkLoginAndConnect();

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('full');
    };
  }, [dispatch, isConnected, router]);

  useEffect(() => {
    if (userId) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, [userId]);

  const onModal = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      dispatch(openModal('MAIN_MODAL'));
    },
    [dispatch]
  );

  const start = useCallback(
    async (e: MouseEvent<HTMLElement>) => {
      if (isLogined) {
        e.stopPropagation();
        try {
          // 기존 소켓 연결이 있다면 먼저 연결 해제
          if (socket.connected) {
            if (user.provider === 'guest') {
              await router.push('/roomlist');
              return;
            }
            socket.disconnect();
          }

          // 소켓 연결을 Promise로 래핑
          await new Promise<void>((resolve, reject) => {
            socket.connect();

            socket.on('connect', () => {
              setIsConnected(true);
              resolve();
            });

            socket.on('connect_error', (error) => {
              reject(error);
            });

            // 타임아웃 설정 (5초)
            setTimeout(() => {
              reject(new Error('Connection timeout'));
            }, 5000);
          });

          // 소켓 연결이 성공적으로 완료된 후에 페이지 이동
          await router.push('/roomlist');
        } catch (error) {
          console.error('Socket connection failed:', error);
          alert('서버 연결에 실패했습니다. 다시 시도해주세요.');
          socket.disconnect();
          setIsConnected(false);
        }

        // 이벤트 리스너들은 연결 성공 후에 등록
        socket.on('disconnect', () => {
          setIsConnected(false);
        });

        socket.on('full', () => {
          setIsFull(true);
          alert('현재 서버가 가득 찼습니다. 잠시 후 다시 시도해주세요.');
          router.push('/');
        });
      }
    },
    [isLogined, router, user.provider]
  );

  const logout = useCallback(
    async (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      await client.get('auth/logout');
      dispatch(clearUserInfo());
      socket.disconnect();
      return;
    },
    [dispatch]
  );

  return (
    <MainForm
      user={user}
      isLogined={isLogined}
      onModal={onModal}
      start={start}
      logout={logout}
    />
  );
};

export default MainFormContainer;
