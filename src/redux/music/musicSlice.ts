import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MusicState {
  music: { [key: string]: any } | null;
}

const initialState: MusicState = {
  music: null,
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    // 상태를 직접 수정하는 방식
    setMusic: (state, action: PayloadAction<{ [key: string]: any } | null>) => {
      state.music = action.payload; // immer에 의해 불변성 유지
    },
    clearMusic: (state) => {
      state.music = null; // immer에 의해 불변성 유지
    },
  },
});

export const { setMusic, clearMusic } = musicSlice.actions;

// Selector 정의
export const selectMusic = (state: { music: MusicState }) => state.music.music;

export default musicSlice.reducer;
