import GoTrue from 'gotrue-js';

const auth = new GoTrue({
  APIUrl: 'https://graced.is/.netlify/identity',
  audience: '',
  setCookie: true,
});

export default auth;
