import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Carousel} from 'react-responsive-carousel'

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <Carousel
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          interval={3000}
          autoPlay={true}
        >
          <div>
            <img
              className="pics"
              src="https://assets.bonappetit.com/photos/5a2188a6fa19ce541a20d153/16:9/w_1600%2Cc_limit/NYC-BRUNCH-OKONOMI_rotate.jpg"
            />
            <p className="legend" />
          </div>
          <div>
            <img
              className="pics"
              src="https://www.sunbornhotels.com/london/wp-content/uploads/sites/2/2013/11/sunborn-london_0598.jpg"
            />
            <p className="legend" />
          </div>
          <div>
            <img
              className="pics"
              src="https://7lzh12hhssy3se5xw1w5dcpy-wpengine.netdna-ssl.com/wp-content/uploads/2018/09/foodiesbrowsing.jpg"
            />
            <p className="legend" />
          </div>
          <div>
            <img
              className="pics"
              src="http://www.dimsumgardenphilly.com/wp-content/uploads/2015/12/Dim-Sum-Garden_025-e1449776224255.jpg"
            />
            <p className="legend" />
          </div>
          <div>
            <img
              className="pics"
              src="https://media.timeout.com/images/105276447/750/422/image.jpg"
            />
            <p className="legend" />
          </div>
          <div>
            <img
              className="pics"
              src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/28/11/sushi-istock.gif?w968"
            />
            <p className="legend" />
          </div>
        </Carousel>
      </div>
    )
  }
}
