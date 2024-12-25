import { getR2URL } from '@/services/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MusicState {
  music: { [key: string]: any } | null;
}

const initialState: MusicState = {
  music: {
    videoId: 'fgSXAKsq - Vo',
    title: '이세계아이돌 (ISEGYE IDOL) - 리와인드 (RE:WIND) Official MV',
    start_time: 2,
    singer: ['아이네', '징버거', '릴파', '주르르', '고세구', '비챤'],
    hint: '다음 곡부터 문제가 시작됩니다!',
    answer: ['리와인드', 'rewind', 're:wind'],
    channel: ['왁타버스'],
    img: getR2URL('/assets/channel/waktaverse.svg'),
  },
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
      state.music = initialState; // immer에 의해 불변성 유지
    },
  },
});

export const { setMusic, clearMusic } = musicSlice.actions;

// Selector 정의
export const selectMusic = (state: { music: MusicState }) => state.music.music;

export default musicSlice.reducer;
