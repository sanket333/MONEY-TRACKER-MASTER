import React from 'react';
import { Row, Col} from 'react-bootstrap';

const TopComponent = ()  => {
    return(
        <div>
            <Row>
          <Col style={{ "backgroundColor": "#c3c3c3", "height": "100px" }}>
            <div >
              <Col style={{ "textAlign": "start", "marginTop": "35px" }}>
                <label><b>Balance: </b> Rs. {localStorage.getItem('currentBalance')}</label>
                <div>
                  <Row>
                    <Col>
                      <label>Income: {localStorage.getItem('income')}</label>
                    </Col>
                    <Col>
                      <label>Spended: {localStorage.getItem('spendedMoney')}</label>
                    </Col>
                  </Row>
                </div>
              </Col>
            </div>
          </Col>
        </Row>
        </div>
    )
}

export default TopComponent;