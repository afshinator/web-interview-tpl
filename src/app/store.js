import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import gameTimeReducer from "../features/gametime/gametimeSlice"

export default configureStore({
  reducer: {
    counter: counterReducer,
    gametime: gameTimeReducer,
  },
});
