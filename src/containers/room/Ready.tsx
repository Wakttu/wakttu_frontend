import { Ready as CReady } from '@/components';
import { clearAnswer } from '@/redux/answer/answerSlice';
import {
  selectGame,
  selectHost,
  selectReadyUser,
  setGame,
  setReady,
} from '@/redux/game/gameSlice';
import { clearHistory } from '@/redux/history/historySlice';
import { clearMusic } from '@/redux/music/musicSlice';
import { selectRoomInfo } from '@/redux/roomInfo/roomInfoSlice';
import { clearTimer } from '@/redux/timer/timerSlice';
import { selectUserInfo, selectUserName } from '@/redux/user/userSlice';
import {
  bellStart,
  cloudStart,
  kungStart,
  lastStart,
  musicStart,
  ready,
  selectTeam,
  socket,
} from '@/services/socket/socket';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Ready = () => {
  const roomInfo = useSelector(selectRoomInfo);
  const readyUsers = useSelector(selectReadyUser);
  const user = useSelector(selectUserInfo);
  const userName = useSelector(selectUserName);
  const host = useSelector(selectHost);
  const game = useSelector(selectGame);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const idx = readyUsers.findIndex((user) => user.name === userName);
    if (idx === -1) setIsReady(false);
    else setIsReady(true);
  }, [readyUsers, userName]);

  const onReady = () => {
    ready(roomInfo.id as string);
  };

  const validateTeams = (
    teams: { [key: string]: any[] },
    totalUsers: number
  ) => {
    const teamCounts = Object.values(teams)
      .map((team) => team.length)
      .filter((count) => count > 0);

    const totalTeamMembers = teamCounts.reduce((acc, curr) => acc + curr, 0);
    if (teamCounts.length <= 1 || totalTeamMembers !== totalUsers) {
      alert('모두 팀을 선택하지 않았습니다!');
      return false;
    }

    const isTeamBalanced = teamCounts.every((count) => count === teamCounts[0]);
    if (!isTeamBalanced) {
      alert('인원수가 맞지 않습니다.');
      return false;
    }

    return true;
  };

  const onStart = useCallback(() => {
    if (isButtonDisabled) return; // 버튼이 비활성화된 경우 실행되지 않음

    setIsButtonDisabled(true); // 클릭 시 버튼 비활성화
    try {
      if (roomInfo.users.length === 1) {
        alert('혼자서는 시작할 수 없습니다!');
        return;
      }

      const expectedReadyCount = roomInfo.users.length - 1;
      if (readyUsers.length !== expectedReadyCount) {
        alert(
          readyUsers.length < expectedReadyCount
            ? '모두 준비 상태가 아닙니다.'
            : '침입자가 존재합니다. 방을 새로 파세요!'
        );
        return;
      }

      if (roomInfo.option?.includes('팀전')) {
        const isValid = validateTeams(game.team, roomInfo.users.length);
        if (!isValid) return;
      }

      const startFunctions: Record<number, (roomId: string) => void> = {
        0: lastStart,
        1: kungStart,
        2: bellStart,
        3: musicStart,
        4: cloudStart,
      };

      const startFunction =
        roomInfo.type !== undefined ? startFunctions[roomInfo.type] : undefined;
      if (startFunction) {
        startFunction(roomInfo.id as string);
      }
    } finally {
      setTimeout(() => setIsButtonDisabled(false), 500); // 작업 완료 후 버튼 활성화 (0.5초 딜레이)
    }
  }, [game.team, readyUsers.length, roomInfo, isButtonDisabled]);
  const onTeam = (team: string) => {
    if (readyUsers.findIndex((user) => user.name === userName) !== -1) {
      alert('준비 상태에서는 팀을 바꿀 수 없어요');
      return;
    }
    selectTeam({ roomId: roomInfo.id as string, team: team });
  };

  useEffect(() => {
    socket.on('ready', (data) => {
      dispatch(setReady(data));
    });

    socket.on('team', (data) => {
      dispatch(setGame(data));
    });

    socket.on('last.start', async (data) => {
      await dispatch(clearHistory());
      await dispatch(clearTimer());
      await dispatch(clearAnswer());
      await dispatch(setGame(data));
      router.push('/game/last');
    });

    socket.on('kung.start', async (data) => {
      await dispatch(clearHistory());
      await dispatch(clearTimer());
      await dispatch(clearAnswer());
      await dispatch(setGame(data));
      router.push('/game/kung');
    });

    socket.on('bell.start', async (data) => {
      await dispatch(clearHistory());
      await dispatch(clearTimer());
      await dispatch(clearAnswer());
      await dispatch(setGame(data));
      router.push('/game/bell');
    });

    socket.on('music.start', async (data) => {
      await dispatch(clearHistory());
      await dispatch(clearTimer());
      await dispatch(clearAnswer());
      await dispatch(clearMusic());
      await dispatch(setGame(data));
      router.push('/game/music');
    });
    socket.on('cloud.start', async (data) => {
      await dispatch(clearHistory());
      await dispatch(clearTimer());
      await dispatch(clearAnswer());
      await dispatch(setGame(data));
      router.push('/game/cloud');
    });

    return () => {
      socket.off('ready');
      socket.off('team');
      socket.off('last.start');
      socket.off('kung.start');
      socket.off('bell.start');
      socket.off('music.start');
      socket.off('cloud.start');
    };
  }, [dispatch, router]);

  return (
    <CReady
      ready={isReady}
      onReady={onReady}
      onStart={host === user.id ? onStart : undefined}
      onTeam={onTeam}
      team={roomInfo.option?.includes('팀전')}
    />
  );
};

export default Ready;
