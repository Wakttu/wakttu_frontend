import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AchieveState {
  id: string;
  name: string;
  desc: string;
  img?: string;
  regDate?: number;
  statId?: string;
  targetStatVal?: number;
}

const initialState: AchieveState[] = [];

export const achieveSlice = createSlice({
  name: 'achieve',
  initialState,
  reducers: {
    setAchieve: (state, action: PayloadAction<AchieveState[]>) => {
      return [...state, ...action.payload];
    },
    clearAchieve: (state) => {
      return initialState;
    },
  },
});

export const { setAchieve, clearAchieve } = achieveSlice.actions;
export const selectAchieve = (state: { achieve: AchieveState[] }) =>
  state.achieve;
export default achieveSlice.reducer;
