import { getIcon } from '@/modules/UserInfo';
import {
  Count,
  CPlayer,
  CUserList,
  Icon,
  List,
  ListTitle,
  Name,
  Title,
} from '@/styles/roomList/UserList';

interface Props {
  users: any;
}

const UserList = ({ users }: Props) => {
  return (
    <CUserList>
      <ListTitle>
        <Title>접속자목록</Title>
        <Count>{Object.keys(users).length}명</Count>
      </ListTitle>
      <List>
        {Object.keys(users).map((key) => {
          const level = getIcon(users[key].score, users[key].provider);
          return (
            <CPlayer key={key}>
              <Icon src={level} />
              <Name $color={users[key].color}>{users[key].name}</Name>
            </CPlayer>
          );
        })}
      </List>
    </CUserList>
  );
};

export default UserList;
