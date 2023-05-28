import { FC, ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { greetingApi } from '../app/services/greeting/greeting';

const render = (
  ui: ReactElement,
  {
    store = configureStore({
      reducer: {
        [greetingApi.reducerPath]: greetingApi.reducer
      },
      middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(greetingApi.middleware)
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper: FC = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { render };
