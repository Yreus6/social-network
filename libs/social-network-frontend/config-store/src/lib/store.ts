import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { greetingApi } from '@sn-htc/social-network-frontend/data-access-home';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { environment } from '@env-frontend/environment';

export const store = configureStore({
  reducer: {
    [greetingApi.reducerPath]: greetingApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(greetingApi.middleware),
  devTools: !environment.production
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
