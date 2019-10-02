import React, {Component} from 'react';
import {Card, Col, Row} from 'react-bootstrap';

class MontlyReport extends Component {
  showThisMonthData = (header, body) => {
    return (
      <Card>
        <Card.Body>
          <Card.Title>
            {header}
          </Card.Title>
          <Card.Text>
            {body}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  render() {
    const {totalPay, currency, month, mostUsed, mostUnused} = this.props.data;
    return (
        <>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  {month}월 리포트
                </Card.Header>
                {this.showThisMonthData(`이번달 결제 총액`, `${currency} ${totalPay}`)}
                {this.showThisMonthData('Most used Service', `${mostUsed}`)}
                {this.showThisMonthData('Most unsed Service', `${mostUnused}`)}
              </Card>
            </Col>
          </Row>
        </>
    );
  }
}

export default MontlyReport;
