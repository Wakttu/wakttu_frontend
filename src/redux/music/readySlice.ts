import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReadyState {
  [userId: string]: boolean;
}

const initialState: ReadyState = {};

const readySlice = createSlice({
  name: 'ready',
  initialState,
  reducers: {
    setReadyState(state, action: PayloadAction<ReadyState>) {
      return action.payload;
    },
    clearReadyState() {
      return initialState;
    },
  },
});

export const { setReadyState, clearReadyState } = readySlice.actions;
export const selectReady = (state: { ready: ReadyState }) => state.ready;
export default readySlice.reducer;
