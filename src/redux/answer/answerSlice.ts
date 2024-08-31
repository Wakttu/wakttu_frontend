import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Answer {
  success?: boolean;
  answer?: string;
  message?: string;
  pause: boolean;
  word: any;
}

const initialState: Answer = {
  success: undefined,
  answer: undefined,
  message: undefined,
  pause: false,
  word: undefined,
};

const failState: Answer = {
  success: undefined,
  answer: undefined,
  message: undefined,
  pause: true,
  word: undefined,
};

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<Answer>) => {
      return action.payload;
    },
    clearAnswer: (state) => {
      return initialState;
    },
    clearSuccess: (state) => {
      return { ...state, success: undefined };
    },
    setPause: (state, action: PayloadAction<boolean>) => {
      return { ...state, pause: action.payload };
    },
  },
});

export const { setAnswer, clearAnswer, setPause, clearSuccess } =
  answerSlice.actions;

export const selectAnswer = (state: { answer: Answer }) => state.answer;
export const selectPause = (state: { answer: Answer }) => state.answer.pause;

export default answerSlice.reducer;
