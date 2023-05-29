import { setupServer } from 'msw/node';
import { ResponseComposition, rest, RestContext, RestRequest } from 'msw';
import { environment } from '../../../../../apps/social-network-frontend/src/environments/environment';
import { mockUser } from './mockUser';

const handlers = [
  rest.get(
    `${environment.apiBaseUrl}/greeting`,
    (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
      return res(
        ctx.json({
          content: `Hello ${mockUser.name}!`,
        })
      );
    }
  ),
];

export const server = setupServer(...handlers);
