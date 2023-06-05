import { AnyAction, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { api as userProfileApi } from '@sn-htc/social-network-frontend/data-access-user';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { environment } from '@sn-htc/social-network-frontend/config-env';

const rootReducer = combineReducers({
  [userProfileApi.reducerPath]: userProfileApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(userProfileApi.middleware),
  devTools: !environment.production
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
