import { useAuth0 } from '@auth0/auth0-react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, user, logout } = useAuth0();
  return (
    <div className="admin-dashboard">
      {isLoading
        ? <span>Loading...</span>
        : !isAuthenticated
          ? <>
            <a onClick={() => loginWithRedirect()}>Login</a>
          </>
          :
          <>
            Hello, {user?.name}. <a onClick={() => logout({ returnTo: window.location.origin })}>Logout</a>
          </>
      }
      <br />
      {isAuthenticated && <Link to="/admin">Dashboard</Link>}
      {isAuthenticated && <Link to="/">Blog</Link>}
      <div className="prose lg:prose-xl">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;