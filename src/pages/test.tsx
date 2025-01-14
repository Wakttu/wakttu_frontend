import { socket } from '@/services/socket/socket';

const Test = () => {
  const handleSocket = () => {
    socket.disconnect();
    setTimeout(() => socket.connect(), 200);
  };

  return <button onClick={handleSocket}>클릭</button>;
};

export default Test;
