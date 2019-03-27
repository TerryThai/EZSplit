import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../../store'
import {Button, Form, Container, Icon, Segment} from 'semantic-ui-react'
import {Welcome} from '../index'
/**
 * COMPONENT
 */
class AuthForm extends React.Component {
  state = {
    checked: false
  }
  render() {
    const {name, displayName, handleSubmit, error} = this.props
    return (
      <div className="loginheight">
        <Welcome />
        <Container className="padThai">
          <Segment inverted id="shadow">
            <Form
              unstackable
              inverted
              onSubmit={evt => {
                handleSubmit(evt, this.state)
              }}
              name={name}
            >
              <Form.Group widths="equal">
                {this.props.signup && (
                  <Form.Input
                    required={true}
                    fluid
                    label="Name"
                    name="name"
                    placeholder="first and last name"
                  />
                )}
                <Form.Input
                  required={true}
                  name="email"
                  fluid
                  label="Email"
                  placeholder="email"
                />
                <Form.Input
                  required={true}
                  name="password"
                  type="password"
                  fluid
                  label="Password"
                  placeholder="password"
                />
              </Form.Group>
              {this.props.name === 'signup' && (
                <Form.Checkbox
                  onChange={() => {
                    this.setState({checked: !this.state.checked})
                  }}
                  defaultChecked={false}
                  name="checkbox"
                  required={true}
                  label="I agree to the Terms and Conditions"
                />
              )}

              <Button type="submit">Submit</Button>
              {!this.props.signup && (
                <Button
                  method="get"
                  action="/auth/google"
                  color="google plus"
                  href="/auth/google"
                >
                  <Icon name="google plus" /> Login with Google
                </Button>
              )}
            </Form>
          </Segment>
        </Container>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => ({
  handleSubmit: (evt, state) => {
    evt.preventDefault()
    console.log(evt, state)
    if (state.checked) {
      const formName = evt.target.name
      const name = evt.target.name.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName, name))
    }
  }
})

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
