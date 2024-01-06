import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import HomePageReducer from './screens/HomePage/slice.ts';
import reduxLogger from "redux-logger";
import RestaurantPageReducer from './screens/RestaurantPage/slice.ts';
import OrderPageReducer from './screens/OrdersPage/slice.ts';
import CommunityPageReducer from './screens/CommunityPage/slice.ts';
import MemberPageReducer from './screens/MembersPage/slice.ts';
//import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware().concat(reduxLogger),
  reducer: {
  //  counter: counterReducer,
  homePage: HomePageReducer,
  restaurantPage: RestaurantPageReducer,
  ordersPage: OrderPageReducer,
  communityPage: CommunityPageReducer,
  memberPage: MemberPageReducer,
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
