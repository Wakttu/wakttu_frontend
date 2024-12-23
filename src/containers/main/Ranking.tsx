import Ranking from '@/components/main/Ranking';
import { client } from '@/services/api';
import { useEffect, useState, MouseEvent } from 'react';

export interface User {
  user: any;
  value?: string;
}

export interface Lists {
  userRanks: User[];
  wooRanks: User[];
  ineRanks: User[];
  jingRanks: User[];
  lilRanks: User[];
  juRanks: User[];
  goRanks: User[];
  viRanks: User[];
}

export type Ranks =
  | 'userRanks'
  | 'wooRanks'
  | 'ineRanks'
  | 'jingRanks'
  | 'lilRanks'
  | 'juRanks'
  | 'goRanks'
  | 'viRanks';

const Rank = () => {
  const [lists, setLists] = useState<Lists>();
  const [list, setList] = useState<User[]>();
  const [isClicked, setClicked] = useState<Ranks>();

  const onClickNav = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as Ranks;
    setClicked(name);
  };

  useEffect(() => {
    const getList = async () => {
      const data = await client
        .get('/stats/rank')
        .then((response) => response.data)
        .catch(console.error);
      setLists(data);
    };

    getList();
  }, []);

  useEffect(() => {
    if (lists && isClicked) setList(lists[isClicked]);
  }, [isClicked, lists]);

  return <Ranking users={list} isClicked={isClicked} onClick={onClickNav} />;
};

export default Rank;
