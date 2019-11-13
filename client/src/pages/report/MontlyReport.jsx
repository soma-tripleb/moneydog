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
      <div className="col padding-zero">
        <div className="montlyReport-subs-header">
          {header}
        </div>
        <div className="montlyReport-subs-body">
          {body}
        </div>
      </div>

    );
  };

  averageSubsPrice = (totalPay, subsAmount) =>{
    return this.numberWithCommas(Math.ceil(Number(totalPay) / Number(subsAmount)));
  };

  render() {
    const {currency, month} = this.props.props;
    return (
      <>
        <Row>
          <Col>
            {/* <div className="report-subtitle">*/}
            {/*  <span className="report-month-text">{month}</span>월 리포트*/}
            {/* </div>*/}
            <div className="row montlyReport-subs-text">
              {this.showThisMonthData('총 구독앱수', `${this.props.data.length} 개`)}
              {this.showThisMonthData('평균 구독가격', this.averageSubsPrice(this.state.totalPrice, this.props.data.length)+'원' ) }
              {this.showThisMonthData(`결제 총액`, `${currency} ${this.numberWithCommas(this.state.totalPrice)}원`)}
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default MontlyReport;
