import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'
import {Menu, Sidebar, Icon} from 'semantic-ui-react'

const menuStyle = {
  justifyContent: 'center'
}

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="sidebar">
    <Link to={isLoggedIn ? '/home' : '/login'}>
      <h1>EZSPLIT</h1>
    </Link>
    <nav>
      {isLoggedIn ? (
        <Menu style={menuStyle} inverted={true}>
          {/* The navbar will show these links after you log in */}
          <Menu.Item>
            <Link to="/home">Home</Link>
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
            <Link to="/addbill">Add Bill</Link>
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
    }
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
