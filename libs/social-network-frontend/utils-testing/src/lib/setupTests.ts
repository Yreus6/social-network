import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import { server } from './mocks/server';
import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-test' });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
