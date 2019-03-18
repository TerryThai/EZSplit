import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Qrcode, Readqr} from '../index'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, imageUrl} = props

  return (
    <div>
      <h3>Welcome, {email} </h3>
      <img src={imageUrl} />
      <Qrcode />
      <Readqr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    imageUrl: state.user.imageUrl
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
