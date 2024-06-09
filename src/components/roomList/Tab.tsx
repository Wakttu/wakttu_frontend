import roomList from '@/styles/modules/roomList/roomList.module.css';

interface Props {
  menuName: string;
  href: string;
}

const Tab = ({ menuName, href }: Props) => {
  return (
    <a href={href} className={roomList.menuTab}>
      <li>{menuName}</li>
    </a>
  );
};

export default Tab;
