import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './user/userSlice';
import modalReducer from './modal/modalSlice';
import roomInfoReducer from './roomInfo/roomInfoSlice';
import filterReducer from './filter/filterSlice';
import gameReducer from './game/gameSlice';
import answerReducer from './answer/answerSlice';
import timerReducer from './timer/timerSlice';
import historyReducer from './history/historySlice';
import audioReducer from './audio/audioSlice';
import resultReducer from './result/resultSlice';
import achieveReducer from './achieve/achieveSlice';
import musicReducer from './music/musicSlice';

export interface RootState {
  user: ReturnType<typeof userReducer>;
  modal: ReturnType<typeof modalReducer>;
  roomInfo: ReturnType<typeof roomInfoReducer>;
  game: ReturnType<typeof gameReducer>;
  filter: ReturnType<typeof filterReducer>;
  answer: ReturnType<typeof answerReducer>;
  timer: ReturnType<typeof timerReducer>;
  history: ReturnType<typeof historyReducer>;
  audio: ReturnType<typeof audioReducer>;
  result: ReturnType<typeof resultReducer>;
  achieve: ReturnType<typeof achieveReducer>;
  music: ReturnType<typeof musicReducer>;
}

const reducers = combineReducers({
  user: userReducer,
  modal: modalReducer,
  roomInfo: roomInfoReducer,
  game: gameReducer,
  filter: filterReducer,
  answer: answerReducer,
  timer: timerReducer,
  history: historyReducer,
  audio: audioReducer,
  result: resultReducer,
  achieve: achieveReducer,
  music: musicReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'audio'],
  blacklist: [
    'modal',
    'roomInfo',
    'game',
    'filter',
    'answer',
    'timer',
    'history',
    'result',
    'achieve',
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
