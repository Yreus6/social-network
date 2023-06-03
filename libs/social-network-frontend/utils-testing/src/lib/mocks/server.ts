import { setupServer } from 'msw/node';
import { ResponseComposition, rest, RestContext, RestRequest } from 'msw';
import { mockUser } from './mockUser';
import { environment } from '@sn-htc/social-network-frontend/config-env';

const handlers = [
  rest.get(
    `${environment.apiBaseUrl}/greeting`,
    (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
      return res(
        ctx.json({
          content: `Hello ${mockUser.sub}!`,
        })
      );
    }
  ),
];

export const server = setupServer(...handlers);
