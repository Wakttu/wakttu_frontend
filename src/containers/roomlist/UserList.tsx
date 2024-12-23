import { UserList as CUserList } from '@/components';
import { getUserList, socket } from '@/services/socket/socket';
import { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    getUserList();
    const interval = setInterval(() => {
      getUserList();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.on('list', (data) => {
      setUsers(data);
    });

    return () => {
      socket.off('list');
    };
  }, [users]);

  return <CUserList users={users} />;
};

export default UserList;
