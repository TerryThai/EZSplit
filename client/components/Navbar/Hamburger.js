import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, clearOCR} from '../../store'
import {slide as Menu} from 'react-burger-menu'

class Hamburger extends Component {
  showSettings(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <Link to={this.props.isLoggedIn ? '/home' : '/login'}>
          <div className="logoMobile">
            <img src="https://tbncdn.freelogodesign.org/91a4a8f3-8bfd-49c2-aeac-45f8d00728f1.png?1553056809103" />
          </div>
        </Link>

        {this.props.isLoggedIn ? (
          <Menu>
            <Link to="/home" onClick={this.props.clearOcr}>
              Home
            </Link>
            <Link to="/friends">Friends</Link>

            <Link to="/groups">Groups</Link>
            <a href="#" onClick={this.props.handleClick}>
              Logout
            </a>
          </Menu>
        ) : (
          <Menu>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
            <Link to="/bio">About Us</Link>
            <Link to="/contacts">Contacts</Link>
          </Menu>
        )}
      </div>
    )
  }
}

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

export default connect(mapState, mapDispatch)(Hamburger)

/**
 * PROP TYPES
 */
Hamburger.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
