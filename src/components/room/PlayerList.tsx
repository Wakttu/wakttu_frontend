import { CPlayerList, WrapPlayerList } from '@/styles/room/PlayerList';
import { Player } from '@/components';

interface Props {
  users: any[];
  ready: any[];
  host: string;
  me: string;
  team: { woo: string[]; gomem: string[]; academy: string[]; isedol: string[] };
  onKick: (data: { id: string; name: string }) => void;
}

const PlayerList = ({ users, ready, host, me, team, onKick }: Props) => {
  const checkReady = (userId: string) => {
    const idx = ready.findIndex((x) => x.userId === userId);
    if (idx >= 0) return true;
    return false;
  };
  const checkMyTeam = (userId: string) => {
    const InWoo = team.woo.findIndex((id) => id === userId);
    const InGomem = team.gomem.findIndex((id) => id === userId);
    const InAcademy = team.academy.findIndex((id) => id === userId);
    const InIsedol = team.isedol.findIndex((id) => id === userId);
    if (InWoo !== -1) return { team: 'woo', name: '우왁굳' };
    else if (InGomem !== -1) return { team: 'gomem', name: '클래식' };
    else if (InAcademy !== -1) return { team: 'academy', name: '아카데미' };
    else if (InIsedol !== -1) return { team: 'isedol', name: '이세돌' };
    else return undefined;
  };

  return (
    <CPlayerList>
      <WrapPlayerList>
        {users.map((user) => {
          return (
            <Player
              key={user.id}
              $ready={checkReady(user.id)}
              user={user}
              myId={me}
              host={host}
              team={checkMyTeam(user.id)}
              onKick={onKick}
            />
          );
        })}
      </WrapPlayerList>
    </CPlayerList>
  );
};

export default PlayerList;
