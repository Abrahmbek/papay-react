import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import HomePageReducer from './screens/HomePage/slice.ts';
import reduxLogger from "redux-logger";
//import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware().concat(reduxLogger),
  reducer: {
  //  counter: counterReducer,
  homePage: HomePageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
