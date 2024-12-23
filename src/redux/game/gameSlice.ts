import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game } from '@/services/socket/socket';

interface Users {
  id: string;
  userId: string;
  charactor: JSON;
  score: number;
}

const initialState: Game = {
  host: '',
  type: 0,
  round: 0,
  turn: 0,
  total: 0,
  users: [],
  keyword: undefined,
  target: '',
  option: undefined,
  chain: 0,
  roundTime: 0,
  turnTime: 0,
  mission: undefined,
  ban: [],
  team: { woo: [], gomem: [], academy: [], isedol: [] },
  quiz: undefined,
  cloud: undefined,
  turnChanged: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<Game>) => {
      return action.payload;
    },
    clearGame: (state) => {
      return initialState;
    },
    setReady: (state, action: PayloadAction<Users[]>) => {
      return { ...state, users: action.payload };
    },
  },
});

export const { setGame, clearGame, setReady } = gameSlice.actions;

export const selectGame = (state: { game: Game }) => state.game;
export const selectReadyUser = (state: { game: Game }) => state.game.users;
export const selectHost = (state: { game: Game }) => state.game.host;
export const selectWhoisTurn = (state: { game: Game }) => {
  const users = state.game.users;
  const turn = state.game.turn;
  if (users.length > 0 && users.length > turn) {
    return users[turn].name;
  }
  return '';
};
export const selectTeam = (state: { game: Game }) => state.game.team;

export default gameSlice.reducer;
