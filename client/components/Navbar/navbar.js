import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, clearOCR} from '../../store'
import {Menu, Sidebar, Icon, Divider} from 'semantic-ui-react'

const menuStyle = {
  justifyContent: 'center'
}

const Navbar = ({handleClick, isLoggedIn, clearOcr}) => (
  <div className="sidebar">
    <Link to={isLoggedIn ? '/home' : '/login'}>
      <img
        className="logo"
        src="https://tbncdn.freelogodesign.org/91a4a8f3-8bfd-49c2-aeac-45f8d00728f1.png?1553056809103"
      />
    </Link>
    <nav>
      {isLoggedIn ? (
        <Menu style={menuStyle} inverted={true}>
          {/* The navbar will show these links after you log in */}
          <Menu.Item>
            <Link to="/home" onClick={clearOcr}>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/friends">Friends</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/groups">Groups</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/receipts">Show All Receipts</Link>
          </Menu.Item>
          <Menu.Item>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </Menu.Item>
        </Menu>
      ) : (
        <Menu style={menuStyle} inverted={true}>
          {/* The navbar will show these links before you log in */}
          <Menu.Item>
            <Link to="/signup">Sign Up</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/login">Log In</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/bio">About Us</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/contacts">Contacts</Link>
          </Menu.Item>
        </Menu>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    clearOcr: () => dispatch(clearOCR())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
