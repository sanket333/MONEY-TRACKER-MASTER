import React from "react";
import { Col, Row , Button} from 'react-bootstrap';

const ButtonSection =({popMethod, variant, text}) => {

    return(
        <div>
            <Row style={{ 'marginTop': "20px" }}>
          <Col>
            <Button variant={variant} onClick={popMethod}>{text}</Button>
          </Col>
          {/* <Col>
            <Button variant="danger" onClick={() => this.popShow()}>Spended Money (-)</Button>
          </Col> */}
        </Row>
        </div>
    )
}
export default ButtonSection;