import React, {Component} from 'react';
import {Row, Col, Card} from 'react-bootstrap';

import './report.css';
import {connect} from 'react-redux';

class Report extends Component {
  state = {
    total_pay: '-',
    currency: '₩',
    month: new Date().getMonth() +1,
    most_used: '-',
    most_unused: '-'
  };

  showSubsList = () =>{
    if ( typeof this.props.subs === 'undefined') {
      return;
    }

    const list = this.props.subs.map(
      (content, i) => (
        <div className="container w-100 p-3" id="inner-element">
          <div className="row">
            <div className="col">
              {content.name}
            </div>
            <div className="col">
              {content.price}
            </div>
            <div className="col">
              {content.channel}
            </div>
          </div>
        </div>)
    );
    return list;
  };

  showThisMonthData = (header, body) =>{
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
    return (
      <>
        <div className="container main-container">
          <div className="row">
            <div className="col-sm">
              <div className="w-100 p-3" id="inner-container">
                구독 리스트
                {this.showSubsList()}
              </div>
            </div>
            <div className="col-sm">
              <div className="w-100 p-3" id="inner-container">
                이번달 리포트
                <Row>
                  <Col>
                    <Card>
                      <Card.Header>
                        {this.state.month}월 리포트
                      </Card.Header>
                      {this.showThisMonthData(`이번달 결제 총액`, `${this.state.currency} ${this.state.total_pay}`)}
                      {this.showThisMonthData('Most used Service', `${this.state.most_used}`)}
                      {this.showThisMonthData('Most unsed Service', `${this.state.most_unused}`)}
                    </Card>
                  </Col>
                </Row>

              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  subs: state.users.subs,
});

export default connect(mapStateToProps)(Report);
