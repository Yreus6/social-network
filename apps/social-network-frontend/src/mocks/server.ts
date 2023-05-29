import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { environment } from '../environments/environment';

const handlers = [
  rest.get(`${environment.apiBaseUrl}/greeting`, (req, res, ctx) => {
    return res(ctx.json({
      content: 'Hello World!'
    }));
  })
];

const server = setupServer(...handlers);

export default server;
