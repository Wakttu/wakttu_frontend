import { GameNav as CGameNav } from '@/components';
import { openModal } from '@/redux/modal/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import FilterBox from './FilterBox';
import { getRoomList } from '@/services/socket/socket';
import { clearRoomInfo } from '@/redux/roomInfo/roomInfoSlice';
import useInput from '@/hooks/useInput';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { selectFilter, setFilter } from '@/redux/filter/filterSlice';

interface Props {
  setToggle: Dispatch<SetStateAction<boolean>>;
}

const GameNav = ({ setToggle }: Props) => {
  const { inputs, setInputs, onInputChange } = useInput({
    keyword: undefined,
  });
  const filter = useSelector(selectFilter);
  const { keyword } = inputs;

  const [isopen, setOpen] = useState<boolean>(false);

  const onSearchOpen = () => {
    if (isopen) setInputs({ keyword: undefined });
    setOpen(!isopen);
  };

  const dispatch = useDispatch();

  const onModal = (type: string) => {
    dispatch(openModal(type));
  };

  const onRoomList = () => {
    dispatch(clearRoomInfo());
    getRoomList();
    setToggle(false);
  };

  useEffect(() => {
    dispatch(setFilter({ ...filter, keyword: keyword }));
  }, [dispatch, keyword]);

  return (
    <CGameNav
      onModal={onModal}
      onRoomList={onRoomList}
      keyword={keyword}
      onChange={onInputChange}
      open={isopen}
      onClick={onSearchOpen}
    >
      <FilterBox />
    </CGameNav>
  );
};

export default GameNav;
