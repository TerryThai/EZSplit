import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Signup,
  Login,
  UserHome,
  GroupsList,
  CreateGroup,
  AddBill,
  groupReceipts,
  FriendsList,
  SocketTable,
  RedirectToReceipt
} from './components'
import {me} from './store/user'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" render={() => <Signup signup={true} />} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route exact path="/addbill" component={AddBill} />
            <Route exact path="/friends" component={FriendsList} />
            <Route exact path="/groups" component={GroupsList} />
            <Route exact path="/groups/create" component={CreateGroup} />
            <Route exact path="/receipts/:groupId" component={groupReceipts} />
            <Route exact path="/editReceipt" component={SocketTable} />
            <Route
              exact
              path="/editReceipt/:receiptId"
              component={SocketTable}
            />
            <Route
              path="/groups/create/redir"
              render={() => <CreateGroup redir={true} redirUrl="/groups" />}
            />

            <Redirect from="*" to="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route
          exact
          path="/editReceipt/:receiptId"
          component={RedirectToReceipt}
        />
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
