import '@testing-library/jest-dom';
import { server, render, screen } from '@sn-htc/social-network-frontend/util-testing';
import Protected from './Protected';
import { rest } from 'msw';
import { environment } from '@env-frontend/environment';

describe('Protected Route', () => {
  it('should display title "Hello test@example.com!"', async () => {
    render(<Protected />);

    expect(await screen.findByText(/Hello test@example.com/)).toBeInTheDocument();
  });

  it('should display title "Unauthorized"', async () => {
    server.use(
      rest.get(`${environment.apiBaseUrl}/greeting`, (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            title: 'Unauthorized'
          })
        );
      })
    );

    render(<Protected />);

    expect(await screen.findByText(/Unauthorized/)).toBeInTheDocument();
  });

  it('should display title "Forbidden"', async () => {
    server.use(
      rest.get(`${environment.apiBaseUrl}/greeting`, (req, res, ctx) => {
        return res(
          ctx.status(403),
          ctx.json({
            title: 'Forbidden'
          })
        );
      })
    );

    render(<Protected />);

    expect(await screen.findByText(/Forbidden/)).toBeInTheDocument();
  });
});
