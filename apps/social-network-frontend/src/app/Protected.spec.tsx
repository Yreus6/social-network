import '@testing-library/jest-dom';
import { server, render, screen } from '@sn-htc/social-network-frontend/utils-testing';
import Protected from './Protected';
import { rest } from 'msw';
import { environment } from '@sn-htc/social-network-frontend/config-env';

describe('Protected Route', () => {
  it('should display title "Hello test@example.com!"', async () => {
    render(<Protected />);

    expect(await screen.findByText(/Hello test@example.com/)).toBeInTheDocument();
  });

  it('should show error when not authorized', async () => {
    server.use(
      rest.get(`${environment.apiBaseUrl}/greeting`, (req, res, ctx) => {
        return res(
          ctx.status(403),
          ctx.json({
            detail: 'Forbidden'
          })
        );
      })
    );

    render(<Protected />);

    expect(await screen.findByText(/Forbidden/)).toBeInTheDocument();
  });
});
