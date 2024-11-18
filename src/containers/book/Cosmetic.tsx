import { CosmeticList as List } from '@/components';
import { CosmeticInfo as Info } from '@/components';
import { AchieveState } from '@/redux/achieve/achieveSlice';
import { closeModal } from '@/redux/modal/modalSlice';
import { selectUserInfo } from '@/redux/user/userSlice';
import {
  getItemList,
  getMyAchieve,
  getMyItemList,
  achieveItem,
  getMyAchieveLocal,
} from '@/services/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UseSelector } from 'react-redux';
import { selectVoiceVolume } from '@/redux/audio/audioSlice';
import useClickSound from '@/hooks/useClickSound';

export interface ITEM {
  id: string;
  name: string;
  url: string;
  category: string;
  author: string;
  achieveId: string[];
  [x: string]: any;
}

const Cosmetic = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const [data, setData] = useState<{
    achieves: AchieveState[];
    size: number;
  }>();
  const [info, setInfo] = useState<ITEM>();
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<ITEM[]>([]);
  const [myItem, setMyItem] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    category: 'all',
    name: '전체',
  });
  const [isMine, setMine] = useState(true);
  const voiceVolume = useSelector(selectVoiceVolume);
  const { play } = useClickSound(voiceVolume);

  const dropDownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = ({
    category,
    name,
  }: {
    category: string;
    name: string;
  }) => {
    setSelectedOption({ category, name });
    setIsOpen(false);
  };

  const handleLeaveClick = () => {
    dispatch(closeModal());
  };

  const handleInfoClick = (e: any) => {
    play();
    const id = e.currentTarget.dataset.id;
    const item = items.find((item) => item.id === id);
    if (item) setInfo(item);
  };

  const handleAchieveItem = useCallback(async () => {
    if (info) await achieveItem(info.id);
  }, [info]);

  useEffect(() => {
    const getItems = async () => {
      const data = await getItemList();
      setItems(data);
      setInfo(data[0]);
    };

    const getMyItems = async () => {
      const data = await getMyItemList(user.id!);
      setMyItem(data);
    };

    getItems();
    getMyItems();
  }, [user.id]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const getAchieves = async () => {
      const res =
        user.provider === 'waktaverse.games'
          ? await getMyAchieve()
          : await getMyAchieveLocal();
      if (res) {
        setData(res);
      }
    };
    getAchieves();
  }, [user.provider]);

  useEffect(() => {
    const check = async () => {
      if (info && myItem) {
        const check_1 = info.achieveId.every((id) =>
          data?.achieves.some((achieve) => achieve.id === id)
        );
        const check_2 = myItem.some(
          (item: { id: string }) => item.id === info.id
        );
        setMine(check_1 && !check_2);
      }
    };
    check();
  }, [data?.achieves, info, myItem, user.id]);

  return (
    <>
      {info && (
        <Info info={info!} isMine={isMine} onClick={handleAchieveItem} />
      )}
      <List
        dataset={items}
        isOpen={isOpen}
        dropDownRef={dropDownRef}
        selectedOption={selectedOption}
        toggleDropdown={toggleDropdown}
        handleInfoClick={handleInfoClick}
        handleOptionClick={handleOptionClick}
        handleLeaveClick={handleLeaveClick}
      />
    </>
  );
};

export default Cosmetic;
