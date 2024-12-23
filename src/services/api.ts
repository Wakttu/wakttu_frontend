import { AchieveState } from '@/redux/achieve/achieveSlice';
import { Result } from '@/redux/result/resultSlice';
import axios from 'axios';

/**
 * Wakttu API 관련 설정함수
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const client = axios.create({ baseURL: API_URL, withCredentials: true });

/**
 * R2 API 관련 설정 함수
 */
export const R2_URL = process.env.NEXT_PUBLIC_R2_URL;
export const getR2URL = (src: string) => R2_URL + src;
export const getAchieveURL = (id: string) =>
  R2_URL + '/assets/achieves/' + id + '.png';
export const getEmoticonURL = (id: string) =>
  R2_URL + '/assets/emoticon/' + id + '.svg';

/**
 * Waktaverse Games API
 */
export const WAKGAME_URL = process.env.NEXT_PUBLIC_WAKGAME_URL;
export const getWAKURL = (src: string) => WAKGAME_URL + src;

/**
 * @description : 통계증가 함수
 */
export const updateStat = async (id: string) => {
  const { stats } = await client
    .get(`/wakta/stat?id=${id}`)
    .then((response) => response.data)
    .catch(console.error);
  const data = await client
    .put('/wakta/stat', {
      stats: [{ id, val: stats.length > 0 ? stats[0].val + 1 : 1 }],
    })
    .then((response) => response.data)
    .catch(console.error);
  const { achieves } = data;
  if (achieves) return achieves;
  else undefined;
};

/**
 * @description : 통계증가 함수
 */
export const updateStatLocal = async (id: string, val: number = 1) => {
  const data = await client
    .put('/stats', {
      statId: id,
      val: val,
    })
    .then((response) => response.data)
    .catch(console.error);
  const { achieves } = data;
  if (achieves) return achieves;
  else undefined;
};

/**
 *
 * @param type : number 값 게임의 타입 0 is Last 1 is Kung . maybe 2 is Bell
 * @default 0
 * @returns achieves : []
 */
export const updatePlayCount = async (type: number = 0) => {
  let id = 'LAST_COUNT';
  if (type === 1) id = 'KUNG_COUNT';
  else if (type === 2) id = 'BELL_COUNT';
  else if (type === 4) id = 'CLOUD_COUNT';
  return await updateStat(id);
};

/**
 *
 * @param type : number 값 게임의 타입 0 is Last 1 is Kung . maybe 2 is Bell
 * @default 0
 * @returns achieves : []
 */
export const updatePlayCountLocal = async (type: number = 0) => {
  let id = 'LAST_COUNT';
  if (type === 1) id = 'KUNG_COUNT';
  else if (type === 2) id = 'BELL_COUNT';
  else if (type === 4) id = 'CLOUD_COUNT';
  return await updateStatLocal(id);
};

/**
 * @description 1위한 횟수 통계
 * @param team : boolean
 */
export const winTheGame = async (team: boolean = false) => {
  const id = team ? 'WINTEAM' : 'WINSOL';
  return await updateStat(id);
};

/**
 * @description 1위한 횟수 통계
 * @param team : boolean
 */
export const winTheGameLocal = async (team: boolean = false) => {
  const id = team ? 'WINTEAM' : 'WINSOL';
  return await updateStatLocal(id);
};

/**
 * @param result : {type: 어떤 타입의 데이터 , word : 단어에 대한 정보가 들어가있음}[]
 * @returns void : 게임내에서 작성한 데이터 통계가 올라감!
 */
export const updateResult = async (result: Result[]) => {
  const arr = result.filter((item) => item.type === 'WORD');
  const data = await client
    .put(`/wakta/result`, arr)
    .then((response) => response.data)
    .catch(console.error);
  const { achieves } = data;
  if (achieves) return achieves;
  else undefined;
};

/**
 * @param result : {type: 어떤 타입의 데이터 , word : 단어에 대한 정보가 들어가있음}[]
 * @returns void : 게임내에서 작성한 데이터 통계가 올라감!
 */
export const updateResultLocal = async (result: Result[]) => {
  const arr = result.filter((item) => item.type === 'WORD');
  const data = await client
    .put(`/stats/result`, arr)
    .then((response) => response.data)
    .catch(console.error);
  const { achieves } = data;
  if (achieves) return achieves;
  else undefined;
};

/**
 *
 * @returns Item List
 */
export const getItemList = async () => {
  const data = await client
    .get('/item')
    .then((response) => response.data)
    .catch(console.error);
  return data;
};

export const getMyItemList = async (userId: string) => {
  const data = await client
    .get('/user/items/' + userId)
    .then((response) => response.data)
    .catch(console.error);
  return data;
};

/**
 *
 * @returns []
 */
export const getAchieveList = async () => {
  const data = await client
    .get('/achieve')
    .then((response) => response.data)
    .catch(console.error);
  return data;
};

/**
 *
 * @returns {achieves : AchieveState, size : number}
 */
export const getMyAchieve = async (): Promise<{
  achieves: AchieveState[];
  size: number;
}> => {
  const data = await client
    .get('/wakta/achieve')
    .then((response) => response.data)
    .catch(console.error);
  return data;
};

export const getMyAchieveLocal = async (): Promise<any> => {
  const data = await client('/stats/achieve')
    .then((response) => response.data)
    .catch(console.error);
  return data;
};

/**
 *
 * @param itemId
 * @description 아이템을 얻는 함수
 */
export const achieveItem = async (itemId: string) => {
  const { success, message } = await client
    .post('/user/achieve/item', {
      itemId,
    })
    .then((res) => res.data)
    .catch(console.error);
  alert(message);
};
