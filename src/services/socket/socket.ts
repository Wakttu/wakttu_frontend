import { io } from "socket.io-client";
import { API_URL } from "../api";

export const socket = io(`${API_URL}/wakttu`, { withCredentials: true });

export interface Chat {
  roomId: string;
  chat: string;
  roundTime: number | null;
  turnTime: number | null;
  score: number | null;
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
  title: string;
  password: string | undefined;
  type: number;
  round: number;
  time: number;
  total: number;
  option?: string[];
}

export type UpdateRoom = Partial<Room>;

export interface Ban {
  roomId: string;
  keyword: string;
}

/* * * * * * *
 * 공통 함수
 * * * * * * */

/*
 * 로비 채팅
 */
export const sendLobbyChat = (message: string) => {
  socket.emit("lobby.chat", message);
};

/*
 * 방안에서의 채팅
 * type Chat에 맞게 설정. 기본적으론 채팅의역할을 함.
 * roundTime, turnTime이 있는 경우 게임진행할 때 해당턴의 유저의 답이 나감.
 */
export const sendChat = (data: Chat) => {
  socket.emit("chat", data);
};

/*
 * 서버에 있는 모든 유저에게 알림을 날림.
 */
export const sendAlarm = (message: string) => {
  socket.emit("alarm", message);
};

/*
 * 모든 방 검색
 */
export const setRoomList = () => {
  socket.emit("roomList");
};

/*
 * 방 입장
 * 비밀번호가 걸려있는경우 값입력 , 없는 경우 'undefined' 값을 줌.
 */
export const enter = (data: Enter) => {
  socket.emit("enter", data);
};

/*
 * 방 나가기
 */
export const exit = (roomId: string) => {
  socket.emit("exit", roomId);
};

/*
 * 퇴장 시키기
 * kick helper 와 연동하여 사용. 방장이 호출해야함.
 */
export const kick = (data: Kick) => {
  socket.emit("kick", data);
};

/*
 * 퇴장 도우미
 * 퇴장 당해야하는 사람이 호출
 */
export const kickHelper = (roomId: string) => {
  socket.emit("kick helper", roomId);
};

/*
 * 방 생성
 * enter 함수를 연속적으로 실행주어야 입장 상태가됨.
 */
export const createRoom = (data: Room) => {
  socket.emit("createRoom", data);
};

/*
 * 방 정보 수정
 * 방장만 이용가능
 */
export const updateRoom = (data: UpdateRoom) => {
  socket.emit("updateRoom", data);
};

/*
 * 방에서 준비상태 토글
 * 방장은 할 필요 없음.
 */
export const ready = (roomId: string) => {
  socket.emit("ready", roomId);
};

/*
 * 서버에 있는 Game, RoomInfo, User 정보가져오기
 */
export const setInfo = () => {
  socket.emit("info");
};

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  *
        Last(끝말잇기) 관련 함수
 * 0@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

/*
 * 끝말잇기 게임 시작
 * 방장만 호출 가능, 모두가 준비 완료상태일 때 시작이 됨.
 */
export const lastStart = (roomId: string) => {
  socket.emit("last.start", roomId);
};

/*
 * 라운드 시작 때 마다 호출
 * 한명만 호출하면 되기 때문에 방장이 호출하도록 함.
 */
export const lastRound = (roomId: string) => {
  socket.emit("last.round", roomId);
};

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  *
        Kung(쿵쿵따) 관련 함수
 * 0@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

/*
 * 쿵쿵따 게임 시작
 * 방장만 호출 가능, 모두가 준비 완료상태일 때 시작이 됨.
 */
export const kungStart = (roomId: string) => {
  socket.emit("kung.start", roomId);
};

/*
 * 라운드 시작 때 마다 호출
 * 한명만 호출하면 되기 때문에 방장이 호출하도록 함.
 */
export const kungRound = (roomId: string) => {
  socket.emit("kung.round", roomId);
};

/*
 * 다음사람이 말하면 안되는 금지어 설정
 * round 함수 다음에 호출하는게 좋을 것 같음.
 */
export const kungBan = (data: Ban) => {
  socket.emit("kung.ban", data);
};