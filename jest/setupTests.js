import {server} from '../mocks/server';
import {beforeAll, afterEach, afterAll} from '@jest/globals';
import AbortController from 'abort-controller';
import {fetch, Headers, Request, Response} from 'cross-fetch';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
global.AbortController = AbortController;

beforeAll(() => {
  server.listen({
    onUnhandledRequest: request => {
      console.log('Unhandled request:', request);
    },
  });
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
