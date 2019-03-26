import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Qrcode, SideBarGroup, FeedInfo, Stats, PopupUpload} from '../index'
import {Grid, Segment, Container, Card} from 'semantic-ui-react'
import {HorizontalBar, Line} from 'react-chartjs-2'

/**
 * COMPONENT
 */
export const UserHome = props => {
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
    <div>
      <div>
        <Grid celled centered>
          {/* within this grid lives 3 Columns. 2 of which are size 6 and a remaining is an assumetrical size 3 */}
          <Grid.Row>
            {/* this is the start of our row. within this row lives 2 columns */}
            <Grid.Column width={6}>
              <Grid columns="equal" relaxed centered>
                <Grid.Row stretched>
                  <Grid.Column>
                    <Segment padded="very" raised={true}>
                      <PopupUpload />
                    </Segment>
                  </Grid.Column>
                  <Grid.Column centered>
                    <Segment padded="very" raised={true} className="stats">
                      <Stats />
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Segment padded="very" raised={true} className="line">
                <Line data={time} />
              </Segment>
            </Grid.Column>
            {/* this is the start of our second column */}
            <Grid.Column width={6}>
              <Grid columns="equal" relaxed centered>
                <Grid.Row>
                  <Grid.Column>
                    <Segment padded="very" raised={true}>
                      <FeedInfo currentUser={email} />
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Segment padded="very" className="chart" raised={true}>
                <HorizontalBar data={data} />
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment compact raised={true} className="user">
                <Card
                  image={imageUrl}
                  description={<Qrcode />}
                  extra={`Welcome, ${email}!!!`}
                  centered="true"
                  color="grey"
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
