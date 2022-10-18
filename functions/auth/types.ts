export type AuthUser = {
  email: string,
  displayName: string,
  password: string,
  password2: string,
};

export type AuthError = {
  name: 
    'email' |
    'displayName' |
    'password' |
    'password2' |
    'login'
  ,
  message: string
};
