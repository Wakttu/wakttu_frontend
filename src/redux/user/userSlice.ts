import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string | null;
  name: string | null;
  score: number | null;
  provider: string | null;
  password: string | null;
  roomId: string | null;
  keyboard: string[] | null;
  [x: string]: any;
}

export interface Character {
  skin: string;
  head: string;
  hand: string;
  eye: string;
}

export interface Emoticon {
  '1': string;
  '2': string;
  '3': string;
}

const initialState: UserState = {
  id: null,
  name: null,
  score: null,
  provider: null,
  password: null,
  roomId: null,
  keyboard: null,
  emoticon: { '1': 'e-1', '2': 'e-1', '3': 'e-1' },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    clearUserId: (state) => {
      state.id = null;
    },
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    setCharacter: (state, action: PayloadAction<Character>) => {
      state.character = action.payload;
    },
    setEmoticon: (state, action: PayloadAction<Emoticon>) => {
      state.emoticon = action.payload;
    },
    clearUserInfo: (state) => {
      return initialState;
    },
  },
});

export const {
  setUserId,
  clearUserId,
  setUserInfo,
  setCharacter,
  setEmoticon,
  clearUserInfo,
} = userSlice.actions;
export const selectUserId = (state: { user: UserState }) => state.user.id;
export const selectUserName = (state: { user: UserState }) => state.user.name;
export const selectUserInfo = (state: { user: UserState }) => state.user;
export const selectCharacter = (state: { user: UserState }) =>
  state.user.character;
export const selectEmoticon = (state: { user: UserState }) =>
  state.user.emoticon
    ? state.user.emoticon
    : { '1': 'e-1', '2': 'e-1', '3': 'e-1' };
export default userSlice.reducer;
