import { AuthUser, AuthError } from './types';
import { getAuthorByEmailQuery, getPasswordByEmailQuery, loginMutation, getLoginHistoryByEmailQuery } from './mutations';
import { HandlerEvent, HandlerResponse } from '@netlify/functions';
import { hygraphClient } from '../utils';
import bcrypt from 'bcryptjs';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

const login = async (event: HandlerEvent): Promise<HandlerResponse> => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized access.' })
    }
  }

  let { email, password }: AuthUser = JSON.parse(event!.body!);
  let errorsArray: AuthError[] = [];

  const submitEmail = await hygraphClient.request(getAuthorByEmailQuery, { email });
  const getPassword = await hygraphClient.request(getPasswordByEmailQuery, { email });

  if (submitEmail.author === null || !getPassword) {
    errorsArray.push({
      name: 'login',
      message: 'There is no account with this email address.'
    });
  }

  const hashedPassword = getPassword.author.password;
  const passwordMatches = await bcrypt.compare(password, hashedPassword).then(result => result).catch(error => error);

  if (!passwordMatches) {
    errorsArray.push({
      name: 'login',
      message: 'Invalid credentials.'
    });
  }

  if (errorsArray.length > 0) {
    return {
      statusCode: 200,
      body: JSON.stringify(errorsArray)
    };
  }

  const getLoginHistory = await hygraphClient.request(getLoginHistoryByEmailQuery, { email }).then(result => result).catch(error => error);
  const loginHistory = getLoginHistory.author.loginHistory;
  const newLoginHistory = [...loginHistory, new Date().toISOString()];

  const submitLogin = await hygraphClient.request(
    loginMutation, 
    { email, data:
      {
        loginHistory: newLoginHistory
      }
    }
  );

  return authRequired(jwt.sign({ secret: submitLogin }, process.env.HYGRAPH_PA_TOKEN!), JSON.stringify({ message: 'Login OK' }));
};

export const authRequired = (token: string, response: any) => {
  const maxTime = 3600000 * 24 * 10;
  const myCookie = cookie.serialize('blog_cookie', token, {
    secure: true,
    httpOnly: true,
    path: '/',
    maxAge: maxTime
  });
  return {
    statusCode: 200,
    headers: {
      'Set-Cookie': myCookie,
      'Cache-Control': 'no-cache',
    },
    body: response
  }
}

export default login;
