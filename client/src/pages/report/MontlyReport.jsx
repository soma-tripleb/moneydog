import React, {Component} from 'react';
import { Col, Row} from 'react-bootstrap';
import counterUp from 'counterup2';

class MontlyReport extends Component {
  state = {
    totalPrice: 0,
  };

  componentWillReceiveProps(nextProps) {
    this.getTotalAmount(nextProps.data);
  };

  componentDidUpdate(prevProps, prevState) {
    counterUp(document.querySelector('.counter1'), {
      duration: 1000,
      delay: 16
    });
    counterUp(document.querySelector('.counter2'), {
      duration: 1000,
      delay: 16
    });
    counterUp(document.querySelector('.counter3'), {
      duration: 1000,
      delay: 16
    });
  }


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

  showThisMonthData = (header, body, num) => {
    return (
      <div className="col padding-zero">
        <div className="montlyReport-subs-header">
          {header}
        </div>
        <div className="montlyReport-subs-body">
          <span className={num}>
            {body}
          </span>
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
          <Col className="padding-zero">
            <div className="row montlyReport-subs-text">
              {this.showThisMonthData('총 구독앱수', `${this.props.data.length} 개`, 'counter1')}
              {this.showThisMonthData('평균 구독가격', this.averageSubsPrice(this.state.totalPrice, this.props.data.length)+'원', 'counter2' ) }
              {this.showThisMonthData(`결제 총액`, `${this.numberWithCommas(this.state.totalPrice)}원`, 'counter3')}
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default MontlyReport;
