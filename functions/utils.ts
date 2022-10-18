import GoTrue from 'gotrue-js';
import { HandlerEvent } from '@netlify/functions';

const urlHelper = (event: HandlerEvent): string => {
  const path = event.path.replace(/\/api\/+/, '');
  const segments = path.split('/').filter(segment => segment);
  const endpoint = segments[segments.length - 1];
  return endpoint;
};

export { urlHelper };
