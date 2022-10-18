import { authRequired } from './login';
import { AuthUser, AuthError } from './types';
import { getAuthorByEmailQuery, signupMutation } from './mutations';
import { HandlerEvent, HandlerResponse } from '@netlify/functions';
import { hygraphClient } from '../utils';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const signup = async (event: HandlerEvent): Promise<HandlerResponse> => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized access.' })
    }
  }

  let { email, displayName, password, password2 }: AuthUser = JSON.parse(event!.body!);
  let errorsArray: AuthError[] = [];

  const submitEmail = await hygraphClient.request(getAuthorByEmailQuery, { email });

  if (!email) {
    errorsArray.push({
      name: 'email',
      message: 'Email address is required.'
    });
  } else if (submitEmail.author !== null) {
    errorsArray.push({
      name: 'email',
      message: 'A user with this email address already exists.'
    });
  }

  if (!displayName) {
    errorsArray.push({
      name: 'displayName',
      message: 'Display Name is required.'
    });
  } else if (displayName.length < 2 || !validator.matches(displayName, /^[0-9a-zA-Z_-\s]+$/)) {
    errorsArray.push({
      name: 'displayName',
      message: 'Minimum display name must be 2 characters and alphanumeric. Underscores, hyphens, and spaces are also allowed.'
    });
  }

  if (!password) {
    errorsArray.push({
      name: 'password',
      message: 'Password is required.'
    })
  } else if (!validator.isStrongPassword(password)) {
    errorsArray.push({
      name: 'password',
      message: 'Password is too weak. Minimum requirements: min. length of 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol.'
    });
  }

  if (password2 !== password) {
    errorsArray.push({
      name: 'password2',
      message: 'Passwords do not match.'
    });
  }

  if (errorsArray.length > 0) {
    return {
      statusCode: 200,
      body: JSON.stringify(errorsArray)
    };
  }

  let hashedPassword = await bcrypt.hash(password, 8)
    .then(result => result)
    .catch(error => error);

  const submitSignup = await hygraphClient.request(
    signupMutation,
    { data:
      { 
        email,
        displayName,
        password: hashedPassword
      }
    }
  );

  return authRequired(jwt.sign({ secret: submitSignup }, process.env.HYGRAPH_PA_TOKEN!), JSON.stringify({ message: 'Login OK' }));
};

export default signup;
