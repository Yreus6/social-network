import '@testing-library/jest-dom';
import { server, render, screen } from '@sn-htc/social-network-frontend/utils-testing';
import Protected from './Protected';
import { graphql } from 'msw';
import { environment } from '@sn-htc/social-network-frontend/config-env';
import { GreetingQuery, GreetingQueryVariables } from '@sn-htc/social-network-frontend/data-access-home';

describe('Protected Route', () => {
  it('should display title "Hello test@example.com!"', async () => {
    render(<Protected />);

    expect(await screen.findByText(/Hello test@example.com/)).toBeInTheDocument();
  });

  it('should show error when not have authority', async () => {
    server.use(
      graphql.link(`${environment.apiBaseUrl}/graphql`)
        .query<GreetingQuery, GreetingQueryVariables>('greeting', (req, res, ctx) => {
          return res(
            ctx.errors([
              {
                message: 'Forbidden',
                extensions: {
                  classification: 'FORBIDDEN'
                }
              }
            ])
          );
        })
    );

    render(<Protected />);

    expect(await screen.findByText(/Forbidden/)).toBeInTheDocument();
  });
});
