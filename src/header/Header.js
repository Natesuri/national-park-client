import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <nav className='left-nav'>
      <Link to="/" className='title'><h4>National Park Finder</h4></Link>
      { user && user.userFavorites && <Link to="/favorites">My Favorites</Link>}
    </nav>
    <nav className='username'>{ user && <span> { user.email }</span>}</nav>
    <nav>
      { user ? authenticatedOptions : unauthenticatedOptions }
    </nav>
  </header>
)

export default Header
