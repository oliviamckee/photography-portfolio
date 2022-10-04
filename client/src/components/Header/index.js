import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className='d-flex justify-content-between'>
      <Link to="/" id="pageTitle">
        <h1 className="m-3">Olivia's Photography</h1>
      </Link>
      <nav className='m-3'>
        {Auth.loggedIn() ? (<>
          <a href="/" className="button2" onClick={logout}>Logout</a>
        </>) : (<>
          <Link className="button2" to="/login">Login</Link>
        </>)}
      </nav>
    </header>
  );
};
export default Header;
