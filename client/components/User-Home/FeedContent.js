import React from 'react'
import {Feed} from 'semantic-ui-react'

const FeedContent = props => {
  return props.ious ? (
    <div>
      {props.ious.youOwe.map(iou => (
        <Feed.Event
          key={iou.email}
          content={`${iou.name} owes you ${iou.amount}.`}
        />
      ))}
      {props.ious.oweYou.map(iou => (
        <Feed.Event
          key={iou.email}
          content={`${iou.name} owes you ${iou.amount}.`}
        />
      ))}
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export default FeedContent
