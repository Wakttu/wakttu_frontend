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
import { useCookies } from 'react-cookie';

const ENV = process.env.NEXT_PUBLIC_NODE_ENV;

const MainFormContainer = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector(selectUserInfo);
  const userId = useSelector(selectUserId);
  const [isLogined, setIsLogined] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [cookies, setCookie] = useCookies(['CF_Authorization']);

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
  }, [cookies.CF_Authorization, dispatch, isConnected, router]);

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

  useEffect(() => {
    if (ENV === 'jogong') {
      const discordLogin = async () => {
        await client
          .get('/auth/discord', {
            headers: {
              Authorization: `Bearer ${cookies.CF_Authorization}`, // 헤더로 토큰 전달
            },
          })
          .then((response) => {
            dispatch(setUserInfo(response.data));
          })
          .catch((err) => console.error(err));
      };
      if (cookies.CF_Authorization) {
        discordLogin();
      }
    }
  }, [cookies.CF_Authorization, dispatch]);

  const start = useCallback(
    async (e: MouseEvent<HTMLElement>) => {
      if (!isLogined) return;

      e.stopPropagation();
      try {
        if (socket.connected && userId) {
          await router.push('/roomlist');
          return;
        }

        let isServerFull = false;
        // 소켓 연결을 Promise로 래핑
        await new Promise<void>((resolve, reject) => {
          socket.connect();

          /*
          const timer = setTimeout(() => {
            reject(
              new Error(
                '서버 연결이 만료되었습니다. 네트워크 상태를 확인해 보세요'
              )
            );
          }, 5000);
          */

          socket.on('connected', () => {
            setIsConnected(true);
            resolve();
          });

          socket.on('full', () => {
            reject(
              new Error(
                '서버 최대 수용 인원을 초과했습니다. 잠시 후에 다시 접속해주세요 !'
              )
            );
          });

          socket.on('connect_error', (error) => {
            reject(error);
          });
        });

        // 소켓 연결이 성공적으로 완료된 후에 페이지 이동
        await router.push('/roomlist');
      } catch (error) {
        console.error('Socket connection failed:', error);
        alert(error);
        socket.disconnect();
        setIsConnected(false);
      }

      // 이벤트 리스너들은 연결 성공 후에 등록 (중복 방지)
      socket.off('disconnect').on('disconnect', () => {
        setIsConnected(false);
      });
    },
    [isLogined, router, userId]
  );

  const logout = useCallback(
    async (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      if (ENV === 'jogong') {
        // alert('조공 서버에서는 로그아웃이 불가능!');
        window.location.href = '/cdn-cgi/access/logout';
        return;
      }

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
