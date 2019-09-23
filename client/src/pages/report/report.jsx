import React, {Component} from 'react';
import {Row, Col, Card} from 'react-bootstrap';

import './report.css';
import {connect} from 'react-redux';
import SubsApp from '../subscribing/subsApp';

class Report extends Component {
  state = {
    total_pay: '36800',
    currency: '₩',
    month: 8,
    most_used: 'Netflix',
    most_unused: 'Watcha Play',
    subscriptions: [
      {
        name: 'Netflix',
        usage: 60,
        price: 12000,
      },
      {
        name: 'Watcha Play',
        usage: 30,
        price: 6900,
      },
      {
        name: 'TVING',
        usage: 20,
        price: 5900,
      },
      {
        name: 'Melon',
        usage: 100,
        price: 12000,
      },
    ],
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Price',
        dataIndex: 'price',

      },
    ],
  };

  showSubsList = () =>{
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
  }

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
                      이번달 리포트
                      </Card.Header>
                      <Card>
                        <Card.Body>
                          <Card.Title>
                            {this.state.month}월 결제 총액
                          </Card.Title>
                          <Card.Text>
                            {this.state.currency}{this.state.total_pay}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card>
                        <Card.Body>
                          <Card.Title>
                          Most used Service
                          </Card.Title>
                          <Card.Text>
                            {this.state.most_used}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card>
                        <Card.Body>
                          <Card.Title>
                          Most unsed Service
                          </Card.Title>
                          <Card.Text>
                            {this.state.most_unused}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card>
                      </Card>
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

const mapDispatchToProps = (dispatch) => {
  return;
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
