import React, { Component } from 'react';
import { ReportProgress } from './index';
import {Card, ListGroup} from 'react-bootstrap';

import './report.css';

class Report extends Component {

  state = {
    title: 'Report page',
    total_pay: '100',
    currency: '$',
    month: 8,
    most_used: 'Netflix',
    most_unused: 'watcha',
  };

  render() {
    return (
      <>
        <h1>{this.state.title}</h1>
        <div className="report-content">
          <h2>Report Content</h2>
          <Card style={{ width: '18rem' }}>
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
          </Card>
        </div>
      </>
    );
  }
}

export default Report;
