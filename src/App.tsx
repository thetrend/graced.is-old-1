import blogLogo from './assets/blog-logo.svg';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';

const App = () => {

  const { loginWithRedirect, isAuthenticated, isLoading, user, logout } = useAuth0();

  const handleLogout = () => {
    try {
      client.resetStore();
      logout({ returnTo: window.location.origin });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="blog">
      <ApolloProvider client={client}>
        <Link to="/"><img src={blogLogo} className="site-logo" /></Link>
        {isLoading
          ? <span>Loading...</span>
          : !isAuthenticated
            ? <>
              <a onClick={() => loginWithRedirect()}>Login</a>
            </>
            :
            <>
              Hello, {user?.name}. <a onClick={() => handleLogout()}>Logout</a>
            </>
        }
      <br />
      {isAuthenticated && <Link to="/admin">Dashboard</Link>}
      {isAuthenticated && <Link to="/">Blog</Link>}
      <div className="prose lg:prose-xl">
        <Outlet />
      </div>
    </ApolloProvider>
    </div >
  );
};

export default App;
