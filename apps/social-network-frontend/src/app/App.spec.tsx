import '@testing-library/jest-dom';

import { render, screen, waitFor } from '../utils/test-utils';
import App from './App';
import server from '../mocks/server';
import { rest } from 'msw';
import { environment } from '../environments/environment';

describe('App', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display title "Hello World"', async () => {
    render(<App />);

    await waitFor(() => screen.getByRole('heading'));

    expect(screen.getByRole('heading')).toHaveTextContent('Loading');
    expect(await screen.findByText(/Hello World/)).toBeInTheDocument();
  });

  it('should display error title', async () => {
    server.use(
      rest.get(`${environment.apiBaseUrl}`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<App />);

    expect(await screen.findByText(/Error/)).toBeInTheDocument();
  });
});
