import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { hgPublicAPI } from './queries';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';

const httpLink = createHttpLink({
    uri: hgPublicAPI,
  });

const authLink = setContext((_, { headers }) => {
  const { isAuthenticated } = useAuth0();
    return {
      headers: {
        ...headers,
        authorization: isAuthenticated ? `Bearer ${import.meta.env.VITE_HYGRAPH_AUTH_TOKEN}` : '',
      }
    };
  });

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

export default client;