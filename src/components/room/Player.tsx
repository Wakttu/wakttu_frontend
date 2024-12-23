import { getCharacter, getIcon } from '@/modules/UserInfo';
import { getR2URL } from '@/services/api';
import {
  CPlayer,
  PlayerInfo,
  PlayerProfile,
  CBadge,
  PlayerIcon,
  PlayerName,
  PlayerReady,
  KickIcon,
  TeamTag,
} from '@/styles/room/PlayerList';
import { useEffect, useState } from 'react';
import Character from '../common/Character';

interface Props {
  $ready: boolean;
  user: any;
  host: string;
  myId: string;
  team?: { team: string; name: string };
  onKick: (data: { id: string; name: string }) => void;
}

const Player = ({
  $ready,
  user,
  myId,
  host,
  team = undefined,
  onKick,
}: Props) => {
  const [icon, setIcon] = useState('');
  const [character, setCharacter] = useState<any>({ skin: '' });

  useEffect(() => {
    setIcon(getIcon(user.score, user.provider));
    setCharacter(user.character);
  }, [user.character, user.provider, user.score]);

  return (
    <CPlayer>
      {user.name && (
        <>
          <PlayerInfo host={host === user.id}>
            <Character character={character} />
            <CBadge>
              <PlayerIcon src={icon} alt="플레이어 등급" />
              <PlayerName>{user.name}</PlayerName>
            </CBadge>
            {team === undefined ? (
              ''
            ) : (
              <TeamTag team={team.team}>{team.name} </TeamTag>
            )}
            {myId === host && user.id !== host && (
              <KickIcon
                src={getR2URL('/assets/icons/kick.svg')}
                alt="내보내기 아이콘"
                onClick={() => onKick({ id: user.id, name: user.name })}
              />
            )}
          </PlayerInfo>
          {host === user.id ? (
            <PlayerReady $ready={true}>
              <span>방 장</span>
            </PlayerReady>
          ) : (
            <PlayerReady $ready={$ready}>
              <span>{$ready ? '준비 됨' : '준비 안됨'}</span>
            </PlayerReady>
          )}
        </>
      )}
      {!user.name && (
        <>
          <PlayerInfo></PlayerInfo>
          <PlayerReady $ready={$ready}>
            <span>빈자리</span>
          </PlayerReady>
        </>
      )}
    </CPlayer>
  );
};

export default Player;
