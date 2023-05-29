import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import { server } from '@sn-htc/social-network-frontend-utils-testing';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
