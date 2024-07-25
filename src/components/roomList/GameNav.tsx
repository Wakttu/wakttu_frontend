import { getRoomList } from '@/services/socket/socket';
import {
  CGameNav,
  LeftIcons,
  CreateRoomBtn,
  Plus,
  SearchBtn,
  RefreshBtn,
  FilterToggled,
  FilterIcon,
  PlusTitle,
} from '@/styles/roomList/GameNav';
import { ReactNode } from 'react';

interface Props {
  onModal: (type: string) => void;
  children: ReactNode;
}

const GameNav = ({ onModal, children }: Props) => {
  return (
    <CGameNav>
      <LeftIcons>
        <CreateRoomBtn onClick={() => onModal('CREATE_ROOM')}>
          <Plus src="/assets/plus.svg" />
          <PlusTitle>방 만들기</PlusTitle>
        </CreateRoomBtn>
        <SearchBtn src="/assets/search.svg" />
        <RefreshBtn src="/assets/refresh.svg" onClick={getRoomList} />
      </LeftIcons>
      <FilterToggled onClick={() => onModal('FILTER')}>
        <FilterIcon src="/assets/filter.svg" />
        {children}
      </FilterToggled>
    </CGameNav>
  );
};

export default GameNav;
