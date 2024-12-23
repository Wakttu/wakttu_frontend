import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Timer {
  roundTime: number;
  turnTime: number;
  countTime: number;
  timerId?: NodeJS.Timeout;
}

const initialState: Timer = {
  roundTime: 0,
  turnTime: 0,
  countTime: 0,
  timerId: undefined,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimer: (
      state,
      action: PayloadAction<{ roundTime: number; turnTime: number }>
    ) => {
      state.roundTime = action.payload.roundTime;
      state.turnTime = action.payload.turnTime;
      state.countTime = 0;
    },
    clearTimer: (state) => {
      return initialState;
    },
    tick: (state) => {
      state.countTime = state.countTime + 100;
    },
    cloudTick: (state) => {
      state.countTime = state.countTime + 1000;
    },
    musicTick: (state) => {
      state.countTime = state.countTime + 1000;
    },
    setTimerId: (state, action: PayloadAction<NodeJS.Timeout>) => {
      state.timerId = action.payload;
    },
    setTurn: (
      state,
      action: PayloadAction<{ roundTime: number; turnTime: number }>
    ) => {
      state.roundTime = action.payload.roundTime;
      state.turnTime = action.payload.turnTime;
      state.countTime = 0;
    },
    clearCountTime: (state) => {
      state.countTime = 0;
    },
  },
});

export const {
  setTimer,
  clearTimer,
  tick,
  cloudTick,
  musicTick,
  setTimerId,
  setTurn,
  clearCountTime,
} = timerSlice.actions;

export const selectTimer = (state: { timer: Timer }) => state.timer;
export const selectTimeId = (state: { timer: Timer }) => state.timer.timerId;

export default timerSlice.reducer;
