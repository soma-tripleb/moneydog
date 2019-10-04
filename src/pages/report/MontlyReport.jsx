import React, {Component} from 'react';
import {Card, Col, Row} from 'react-bootstrap';

class MontlyReport extends Component {
  state = {
    totalPrice: 0,
  };

  componentDidMount() {
    this.calculateTotalPrice();
  };

  calculateTotalPrice = () =>{
    let totalPay = 0;
    this.props.data.map(
      (content) =>{
        totalPay += Number(content.price);
      });

    this.setState({
      totalPrice: totalPay,
    });
  };

  numberWithCommas = (number) => {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

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

  averageSubsPrice = (totalPay, subsAmount) =>{
    return Math.ceil(Number(totalPay) / Number(subsAmount));
  };

  render() {
    const {currency, month} = this.props.props;
    return (
        <>
          <Row>
            <Col>
              <div className="headerFont">
                {month}월 리포트
              </div>
              <Card>
                {this.showThisMonthData(`결제 총액`, `${currency} ${this.numberWithCommas(this.state.totalPrice)}`)}
                {this.showThisMonthData('평균 구독 가격', '₩ '+this.averageSubsPrice(this.state.totalPrice, this.props.data.length) ) }
                {this.showThisMonthData('총 구독 앱 수', `${this.props.data.length} 개`)}
              </Card>
            </Col>
          </Row>
        </>
    );
  }
}

export default MontlyReport;
