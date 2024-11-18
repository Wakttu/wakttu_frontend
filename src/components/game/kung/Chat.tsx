import { getIcon } from '@/modules/UserInfo';
import {
  PlayerChat,
  CPlayer,
  PlayerName,
  PlayerIcon,
  ChatContent,
  DateContent,
} from '@/styles/common/Chat';

interface Props {
  user: any;
  chat: string;
  date: string;
}

const Chat = ({ user, chat, date }: Props) => {
  const icon = getIcon(user.score, user.provider);

  return (
    <PlayerChat>
      <CPlayer>
        <PlayerIcon src={icon} />
        <PlayerName $color={user.color}>{user.name}</PlayerName>
        <ChatContent>{chat}</ChatContent>
      </CPlayer>
      <DateContent>{date}</DateContent>
    </PlayerChat>
  );
};

export default Chat;
