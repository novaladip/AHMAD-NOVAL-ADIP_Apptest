import {setupServer} from 'msw/node';
import {contactsHandler} from './handlers';

export const server = setupServer(...contactsHandler);
