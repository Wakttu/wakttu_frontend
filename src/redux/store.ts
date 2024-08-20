import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './user/userSlice';
import modalReducer from './modal/modalSlice';
import roomInfoReducer from './roomInfo/roomInfoSlice';
import filterReducer from './filter/filterSlice';
import gameReducer from './game/gameSlice';
import answerReducer from './answer/answerSlice';

export interface RootState {
  user: ReturnType<typeof userReducer>;
  modal: ReturnType<typeof modalReducer>;
  roomInfo: ReturnType<typeof roomInfoReducer>;
  game: ReturnType<typeof gameReducer>;
  filter: ReturnType<typeof filterReducer>;
  answer: ReturnType<typeof answerReducer>;
}

const reducers = combineReducers({
  user: userReducer,
  modal: modalReducer,
  roomInfo: roomInfoReducer,
  game: gameReducer,
  filter: filterReducer,
  answer: answerReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  blacklist: ['modal', 'roomInfo', 'game', 'filter', 'answer'],
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
