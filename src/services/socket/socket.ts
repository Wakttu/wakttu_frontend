import { io } from 'socket.io-client';
import { API_URL } from '../api';

export const socket = io(`${API_URL}/wakttu`, {
  withCredentials: true,
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  transports: ['websocket'],
});

export interface Chat {
  roomId: string;
  chat: string;
  roundTime: number | null;
  score: number | null;
  success?: boolean;
}

export interface Enter {
  roomId: string;
  password: string | undefined;
}

export interface Kick {
  roomId: string;
  userId: string;
}

export interface Room {
  id?: string;
  idx?: number;
  title?: string;
  password?: string;
  type?: number;
  round?: number;
  time?: number;
  total?: number;
  option?: string[];
  status?: boolean;
  [x: string]: any;
}

export interface Game {
  ban: string[];
  host: string;
  type: number;
  round: number;
  turn: number;
  total: number;
  users: { [x: string]: any }[];
  keyword: { [x: string]: any } | undefined;
  target: string;
  option: boolean[] | undefined;
  chain: number;
  roundTime: number;
  turnTime: number;
  mission: string | undefined;
  team: { woo: string[]; gomem: string[]; isedol: string[]; academy: string[] };
  quiz?: { _id: string; choseong: string; hint: string[]; [x: string]: any }[];
  cloud?: {
    _id: string;
    delay: string;
    duration: string;
    x: string;
    y: string;
    clear: boolean;
    special: boolean;
    meta: any;
    type: number;
    [x: string]: any;
  }[];
  turnChanged: boolean;
}

export type UpdateRoom = Partial<Room>;

export interface Ban {
  roomId: string;
  keyword: string;
}

export interface Emoticon {
  roomId: string;
  userId: string;
  emoticonId: string;
}

/* * * * * * *
 * 공통 함수
 * * * * * * */

/*
 * 로비 채팅
 */
export const sendLobbyChat = (message: string) => {
  socket.emit('lobby.chat', message);
};

/*
 * 방안에서의 채팅
 * type Chat에 맞게 설정. 기본적으론 채팅의역할을 함.
 * roundTime, turnTime이 있는 경우 게임진행할 때 해당턴의 유저의 답이 나감.
 */
export const sendChat = (data: Chat) => {
  socket.emit('chat', data);
};

/*
 * 서버에 있는 모든 유저에게 알림을 날림.
 */
export const sendAlarm = (message: string) => {
  socket.emit('alarm', message);
};

/*
 * 모든 방 검색
 */
export const getRoomList = () => {
  socket.emit('roomList');
};

/*
 * 유저 목록 가져오기
 */
export const getUserList = () => {
  socket.emit('list');
};

/*
 * 방 입장
 * 비밀번호가 걸려있는경우 값입력 , 없는 경우 'undefined' 값을 줌.
 */
export const enter = (data: Enter) => {
  socket.emit('enter', data);
};

/*
 * 방 나가기
 */
export const exit = (roomId: string) => {
  socket.emit('exit', roomId);
};

/*
 * 퇴장 시키기
 * kick helper 와 연동하여 사용. 방장이 호출해야함.
 */
export const kick = (data: Kick) => {
  socket.emit('kick', data);
};

/*
 * 퇴장 도우미
 * 퇴장 당해야하는 사람이 호출
 */
export const kickHelper = (roomId: string) => {
  socket.emit('kick helper', roomId);
};

/*
 * 방 생성
 * enter 함수를 연속적으로 실행주어야 입장 상태가됨.
 */
export const createRoom = (data: Room) => {
  socket.emit('createRoom', data);
};

/*
 * 방 정보 수정
 * 방장만 이용가능
 */
export const updateRoom = (data: UpdateRoom) => {
  socket.emit('updateRoom', data);
};

/*
 * 방에서 준비상태 토글
 * 방장은 할 필요 없음.
 */
export const ready = (roomId: string) => {
  socket.emit('ready', roomId);
};

/**
 * 팀선택
 */

export const selectTeam = ({
  roomId,
  team,
}: {
  roomId: string;
  team: string;
}) => {
  socket.emit('team', { roomId, team });
};

/*
 * 서버에 있는 Game, RoomInfo, User 정보가져오기
 */
export const setInfo = () => {
  socket.emit('info');
};

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  *
        Last(끝말잇기) 관련 함수
 * 0@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

/*
 * 끝말잇기 게임 시작
 * 방장만 호출 가능, 모두가 준비 완료상태일 때 시작이 됨.
 */
export const lastStart = (roomId: string) => {
  socket.emit('last.start', roomId);
};

/*
 * 라운드 시작 때 마다 호출
 * 한명만 호출하면 되기 때문에 방장이 호출하도록 함.
 */
export const lastRound = (roomId: string) => {
  socket.emit('last.round', roomId);
};

/**
 *
 * 턴시작 socket
 */
export const lastTurnStart = (roomId: string) => {
  socket.emit('last.turnStart', roomId);
};

/**
 *
 * 턴끝 socket
 */
export const lastTurnEnd = (roomId: string) => {
  socket.emit('last.turnEnd', roomId);
};

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  *
        Kung(쿵쿵따) 관련 함수
 * 0@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

/*
 * 쿵쿵따 게임 시작
 * 방장만 호출 가능, 모두가 준비 완료상태일 때 시작이 됨.
 */
export const kungStart = (roomId: string) => {
  socket.emit('kung.start', roomId);
};

/*
 * 라운드 시작 때 마다 호출
 * 한명만 호출하면 되기 때문에 방장이 호출하도록 함.
 */
export const kungRound = (roomId: string) => {
  socket.emit('kung.round', roomId);
};

/*
 * 다음사람이 말하면 안되는 금지어 설정
 * round 함수 다음에 호출하는게 좋을 것 같음.
 */
export const kungBan = (data: Ban) => {
  socket.emit('kung.ban', data);
};

export const kungBanStart = (roomId: string) => {
  socket.emit('kung.banStart', roomId);
};

/**
 *
 * 턴시작 socket
 */
export const kungTurnStart = (roomId: string) => {
  socket.emit('kung.turnStart', roomId);
};

/**
 *
 * 턴끝 socket
 */
export const kungTurnEnd = (roomId: string) => {
  socket.emit('kung.turnEnd', roomId);
};

/**
 *
 * Bell
 */

export const bellStart = (roomId: string) => {
  socket.emit('bell.start', roomId);
};

export const bellRound = (roomId: string) => {
  socket.emit('bell.round', roomId);
};

export const bellRoundStart = (roomId: string) => {
  socket.emit('bell.roundStart', roomId);
};

export const bellRoundEnd = (roomId: string) => {
  socket.emit('bell.roundEnd', roomId);
};

//
export const musicStart = (roomId: string) => {
  socket.emit('music.start', roomId);
};
export const musicRound = (roomId: string) => {
  socket.emit('music.round', roomId);
};
export const musicReady = (roomId: string) => {
  socket.emit('music.ready', roomId);
};
/**
 *
 * cloud game
 */

export const cloudStart = (roomId: string) => {
  socket.emit('cloud.start', roomId);
};

export const cloudRound = (roomId: string) => {
  socket.emit('cloud.round', roomId);
};

export const cloudRoundStart = (roomId: string) => {
  socket.emit('cloud.roundStart', roomId);
};

export const cloudRoundEnd = (roomId: string) => {
  socket.emit('cloud.roundEnd', roomId);
};

/**
 *
 * 이모티콘 socket
 */
export const sendEmoticon = (data: Emoticon) => {
  socket.emit('emoticon', data);
};
