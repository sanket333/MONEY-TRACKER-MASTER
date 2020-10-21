import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';

const ExpList = ({expend}) => {

    const expenditure = localStorage.getItem('expenditure') === null ? expend : JSON.parse(localStorage.getItem('expenditure'))


    return(
        <div>
        <Row style={{ 'marginTop': "20px" }}>
          <Col style={{ "backgroundColor": "white" }}>
            <ListGroup >
              {expenditure.length == 0 ? <p>No Spended money</p> :
                expenditure.map((spend, index) => {
                  return <ListGroup.Item style={{
                    "display": "flex",
                    "justifyContent": "space-between"
                  }} key={index} variant={spend.spended ? "danger" : "success"}>
                    <div>{spend.date}</div>
                    <div>{spend.description}</div>
                    <div>{"Rs."}{spend.moneyValue}</div>
                  </ListGroup.Item>
                })}
            </ListGroup>
          </Col>
        </Row>
        </div>
    )
}

export default ExpList;