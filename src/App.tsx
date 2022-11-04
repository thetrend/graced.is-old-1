import blogLogo from './assets/blog-logo.svg';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

const App = () => {

  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  return (
    <div>
      <img src={blogLogo} />
      {!isAuthenticated
        ? <a onClick={() => loginWithRedirect()}>Login</a>
        : 
          <>
            Hello, {user?.name}. <a onClick={() => logout({ returnTo: window.location.origin })}>Logout</a>
          </>
          }
    </div>
  );
};

export default App;
