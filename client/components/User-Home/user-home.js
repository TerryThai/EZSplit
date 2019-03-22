import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Qrcode, Readqr, UploadImage, Table, SideBarGroup} from '../index'
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Image,
  Container,
  Card,
  Icon
} from 'semantic-ui-react'
import {HorizontalBar} from 'react-chartjs-2'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, imageUrl} = props
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Receipt Totals By Month',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderColor: 'rgba(39, 87, 113, 0.4)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  }
  return !props.ocr.amounts ? (
    <div className="userhome">
      <Segment compact floated="right" raised={true}>
        <Card
          image={imageUrl}
          description={<Qrcode />}
          extra={`Welcome, ${email}!!!`}
          centered={true}
          color="grey"
        />
      </Segment>
      <Segment floated="right" padded="very" raised={true}>
        <UploadImage className="upload" />
      </Segment>
      <Segment floated="right" padded="very" className="chart" raised={true}>
        <HorizontalBar data={data} />
      </Segment>
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
