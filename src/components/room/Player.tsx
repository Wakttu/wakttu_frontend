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

interface Props {
  $ready: boolean;
  user: any;
  host: string;
  myName: string;
  team?: { team: string; name: string };
  onKick: (data: { id: string; name: string }) => void;
}

const Player = ({
  $ready,
  user,
  myName,
  host,
  team = undefined,
  onKick,
}: Props) => {
  const icon = getIcon(user.score, user.provider);
  const character = getCharacter(user.character);
  return (
    <CPlayer>
      {user.name && (
        <>
          <PlayerInfo>
            <PlayerProfile src={character.skin} />
            <CBadge>
              <PlayerIcon src={icon} />
              <PlayerName>{user.name}</PlayerName>
            </CBadge>
            {team === undefined ? (
              ''
            ) : (
              <TeamTag team={team.team}>{team.name} </TeamTag>
            )}
            {myName === host && user.name !== host && (
              <KickIcon
                src={getR2URL('/assets/icons/kick.svg')}
                onClick={() => onKick({ id: user.id, name: user.name })}
              />
            )}
          </PlayerInfo>
          {host === user.name ? (
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
