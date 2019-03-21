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

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, imageUrl} = props
  console.log(props.ocr)
  return !props.ocr.amounts ? (
    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <Card
            image={imageUrl}
            description={<Qrcode />}
            extra={`Welcome, ${email}!!!`}
            centered={true}
            raised={true}
            color="grey"
          />
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          <UploadImage />
        </Grid.Column>
      </Grid>
      <Divider vertical />
    </Segment>
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
