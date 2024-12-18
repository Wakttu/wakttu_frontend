import { MyStyleList as StyleList } from '@/components';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, setCharacter } from '@/redux/user/userSlice';
import { client, getMyItemList } from '@/services/api';
import { MouseEvent } from 'react';
import useClickSound from '@/hooks/useClickSound';
import { selectVoiceVolume } from '@/redux/audio/audioSlice';

type Variant = 'skin' | 'head' | 'hand' | 'eye';

const MyStyleList = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const user = useSelector(selectUserInfo);
  const [items, setItems] = useState<
    {
      id: string;
      category: Variant;
      name: string;
      description: string;
      url: string;
      author: string;
    }[]
  >();
  const [itemList, setItemList] = useState(items);

  const [clickTag, setClickTag] = useState<string>('all');
  const [clickItem, setClickItem] = useState<{
    skin: string;
    hand: string;
    head: string;
    eye: string;
  }>(user.character);
  const voiceVolume = useSelector(selectVoiceVolume);
  const { play: playClickSound } = useClickSound(voiceVolume);

  const handleClickTag = (e: MouseEvent<HTMLElement>) => {
    const clicked = e.currentTarget.dataset.category;
    if (clicked) {
      setClickTag(clicked);
    }
  };

  const handleClickItem = (e: MouseEvent<HTMLElement>) => {
    playClickSound();
    const clickedId = e.currentTarget.id;
    const clickedCategory = e.currentTarget.dataset['category'] as Variant;
    if (
      clickedCategory !== 'skin' &&
      (clickItem.skin === 'S-1' || clickItem.skin === 'S-2')
    ) {
      alert('오리지널 스킨은 아이템 착용이 불가합니다!');
      return;
    }
    if (clickedId) {
      if (clickedId === 'S-1' || clickedId === 'S-2') {
        setClickItem({ skin: clickedId, hand: '', head: '', eye: '' });
      } else {
        if (clickItem[clickedCategory] === clickedId) {
          setClickItem({
            ...clickItem,
            [clickedCategory]: clickedCategory === 'skin' ? 'S-1' : '',
          });
        } else setClickItem({ ...clickItem, [clickedCategory]: clickedId });
      }
    }
  };

  const getItem = useCallback(async () => {
    const data = await getMyItemList(user.id!);
    setItems(data);
  }, [user.id]);

  useEffect(() => {
    getItem();
    setLoading(false);
  }, [getItem]);

  useEffect(() => {
    setClickItem(user.character);
  }, [user.character]);

  useEffect(() => {
    dispatch(setCharacter(clickItem));
  }, [clickItem, dispatch]);

  useEffect(() => {
    if (items) {
      if (clickTag === 'all') {
        setItemList(items);
      } else {
        setItemList(items.filter((item) => item.category === clickTag));
      }
    }
  }, [clickTag, items]);
  return (
    <>
      {isLoading ? (
        ''
      ) : (
        <>
          <StyleList
            itemList={itemList}
            clickTag={clickTag}
            clickItem={clickItem}
            handleClickItem={handleClickItem}
            handleClickTag={handleClickTag}
          />
        </>
      )}
    </>
  );
};

export default MyStyleList;
