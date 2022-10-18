import { gql } from 'graphql-request';

export const getAuthorByEmailQuery = gql`
  query getAuthorByEmailQuery($email: String!) {
    author(where: {email: $email}) {
      id
      email
      displayName
    }
  }
`;

export const signupMutation = gql`
  mutation createAuthor($data: AuthorCreateInput!) {
    createAuthor(data: $data) {
      id
      email
      displayName
    }
  }
`;

export const getPasswordByEmailQuery = gql`
  query getPasswordByEmailQuery($email: String!) {
    author(where: {email: $email}) {
      password
    }
  }
`;

export const getLoginHistoryByEmailQuery = gql`
  query getLoginHistoryByEmailQuery($email: String!) {
    author(where: {email: $email}) {
      loginHistory
    }
  }
`;

export const loginMutation = gql`
  mutation loginMutation($email: String!, $loginHistory: [DateTime!]) {
    updateAuthor(data: {loginHistory: $loginHistory}, where: {email: $email}) {
      id
      email
      displayName
    }
  }
`;