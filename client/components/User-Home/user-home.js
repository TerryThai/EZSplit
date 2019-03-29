import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Qrcode, SideBarGroup, FeedInfo, Stats, PopupUpload} from '../index'
import {Grid, Segment, Container, Card} from 'semantic-ui-react'
import {HorizontalBar, Line} from 'react-chartjs-2'
import history from '../../history'

/**
 * COMPONENT
 */

export const UserHome = props => {
  const receiptUrl = localStorage.getItem('receipt')
  if (receiptUrl) {
    localStorage.removeItem('receipt')
    history.push(receiptUrl)
  }
  const {email, imageUrl} = props
  const time = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  }

  return !props.ocr.amounts ? (
    <div id="user-background">
      <div id="main-container">
        <div className="padding-for-first-item">
          <div className="item">
            <PopupUpload className="row-padding" />
            <Stats className="row-padding" />
          </div>
          <div className="wrapper">
            <div className="profile">
              <img src={imageUrl} className="thumbnail" />
              <div className="check">
                <i className="fas fa-check" />
              </div>
              <p className="title">{email}</p>
              <div className="qr">
                <Qrcode />
              </div>
              <Line data={time} id="line" className="row-padding" />
              <div className="smallFeed">
                <FeedInfo currentUser={email} className="smallFeed" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="largeFeed">
        <FeedInfo currentUser={email} />
      </div>
    </div>
  ) : (
    <Container className="custom">
      <SideBarGroup />
    </Container>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    imageUrl: state.user.imageUrl,
    ocr: state.receipts.ocr
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
