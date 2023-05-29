import { configureStore } from '@reduxjs/toolkit';

import { greetingApi } from './app/services/greeting/greeting';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [greetingApi.reducerPath]: greetingApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(greetingApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
