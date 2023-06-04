import { setupServer } from 'msw/node';
import { graphql } from 'msw';
import { mockUser } from './mockUser';
import { environment } from '@sn-htc/social-network-frontend/config-env';
import { GreetingQuery, GreetingQueryVariables } from '@sn-htc/social-network-frontend/data-access-home';

const handlers = [
  graphql.link(`${environment.apiBaseUrl}/graphql`)
    .query<GreetingQuery, GreetingQueryVariables>('greeting', (req, res, ctx) => {
      return res(
        ctx.data({
          greeting: `Hello ${mockUser.sub}`
        })
      );
    })
];

export const server = setupServer(...handlers);
