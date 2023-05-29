import { setupServer } from 'msw/node';
import { ResponseComposition, rest, RestContext, RestRequest } from 'msw';
import { mockUser } from './mockUser';
import { environment } from '@env-frontend/environment';

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
