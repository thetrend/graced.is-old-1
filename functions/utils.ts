import { HandlerEvent } from '@netlify/functions';
import { GraphQLClient } from 'graphql-request';

const urlHelper = (event: HandlerEvent): string => {
  const path = event.path.replace(/\/api\/+/, '');
  const segments = path.split('/').filter(segment => segment);
  const endpoint = segments[segments.length - 1];
  return endpoint;
};

const hygraphClient = new GraphQLClient(process.env.HYGRAPH_URL!, {
  headers: {
    'Authorization': `Bearer ${process.env.HYGRAPH_PA_TOKEN}`
  }
});

export { urlHelper, hygraphClient };
