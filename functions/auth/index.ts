import signup from './signup';
import login from './login';
import { urlHelper } from '../utils';
import { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent) => {
  const endpoint = urlHelper(event);

  let response: Promise<HandlerResponse> | HandlerResponse;

  switch (endpoint) {
    case 'signup':
      response = signup(event);
      break;
    case 'login':
      response = login(event);
      break;
    default:
      response = {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
  }

  return response;
};

export { handler };