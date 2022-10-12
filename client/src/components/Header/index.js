import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  const homeClick = () => {
    window.location.reload();
  }

  return (
    <header className='d-flex justify-content-between'>
      <Link to="/" id="pageTitle" onClick={homeClick}>
        <h1 className="m-3">Olivia's Photography</h1>
      </Link>
      <nav className='m-3'>
        <Link className='button2' to="/contact">Contact</Link>
        {Auth.loggedIn() ? (<>
          <a href="/" className="button2" onClick={logout}>Logout</a>
        </>) : (<>
          <Link className="button2" to="/login">Admin</Link>
        </>)}
      </nav>
    </header>
  );
};
export default Header;
