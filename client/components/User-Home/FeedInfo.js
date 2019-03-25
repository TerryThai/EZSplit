import React, {Component} from 'react'
import {Feed} from 'semantic-ui-react'

export default class FeedInfo extends Component {
  render() {
    return (
      <Feed>
        <Feed.Event content="Yuva owes you $5.00" />
        <Feed.Event content="Yuva owes you $5.00" />
        <Feed.Event content="Yuva owes you $5.00" />
        <Feed.Event content="Yuva owes you $5.00" />
      </Feed>
    )
  }
}
