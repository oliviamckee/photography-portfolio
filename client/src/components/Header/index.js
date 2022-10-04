import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <div>
        <Link to="/" id="pageTitle">
          <h1 className="m-3">Photography</h1>
        </Link>

        <nav>
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link className="button1" to="/login">Login</Link>
              <Link className="button1" to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
