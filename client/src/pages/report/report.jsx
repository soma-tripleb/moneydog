import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Table, Card} from 'antd';

import './report.css';

class Report extends Component {
  state = {
    title: 'Report page',
    total_pay: '36800',
    currency: '₩',
    month: 8,
    most_used: 'Netflix',
    most_unused: 'Watcha Play',
    subscriptions: [
      {
        name: 'netflix',
        usage: 60,
        price: 12000
      },
      {
        name: 'Watcha Play',
        usage: 30,
        price: 6900
      },
      {
        name: 'tving',
        usage: 20,
        price: 5900
      },
      {
        name: 'melon',
        usage: 100,
        price: 12000
      }
    ],
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Price',
        dataIndex: 'price',

      }
    ]
  };

  render() {
    return (
      <>
        <h1>{this.state.title}</h1>
        <div className="report-content">
          <h2>Report Content</h2>
          <Container>
            {/*<Row>*/}
            {/*  <Col sm={3}></Col>*/}
            {/*  <Col sm={6}>*/}
            {/*    <Card>*/}
            {/*      <Card.Header>*/}
            {/*        이번달 리포트*/}
            {/*      </Card.Header>*/}
            {/*      <Card>*/}
            {/*        <Card.Body>*/}
            {/*          <Card.Title>*/}
            {/*            {this.state.month}월 결제 총액*/}
            {/*          </Card.Title>*/}
            {/*          <Card.Text>*/}
            {/*            {this.state.currency}{this.state.total_pay}*/}
            {/*          </Card.Text>*/}
            {/*        </Card.Body>*/}
            {/*      </Card>*/}

            {/*      <Card>*/}
            {/*        <Card.Body>*/}
            {/*          <Card.Title>*/}
            {/*            Most used Service*/}
            {/*          </Card.Title>*/}
            {/*          <Card.Text>*/}
            {/*            {this.state.most_used}*/}
            {/*          </Card.Text>*/}
            {/*        </Card.Body>*/}
            {/*      </Card>*/}

            {/*      <Card>*/}
            {/*        <Card.Body>*/}
            {/*          <Card.Title>*/}
            {/*            Most unsed Service*/}
            {/*          </Card.Title>*/}
            {/*          <Card.Text>*/}
            {/*            {this.state.most_unused}*/}
            {/*          </Card.Text>*/}
            {/*        </Card.Body>*/}
            {/*      </Card>*/}
            {/*      <Card>*/}
            {/*        <Table columns={this.state.columns} dataSource={this.state.subscriptions} bordered />*/}
            {/*      </Card>*/}
            {/*    </Card>*/}
            {/*  </Col>*/}
            {/*  <Col sm={3}></Col>*/}
            {/*</Row>*/}
          </Container>
        </div>
      </>
    );
  }
}

export default Report;
