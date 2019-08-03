import React, { Component } from 'react';
import { ReportProgress } from '../component/report/index';
import '../static/style/page/report.css';

import '../static/style/page/report.css';

class Report extends Component {

  state = {
    title: 'Report page',
  };

  render() {
    return (
      <>
        <h1>{this.state.title}</h1>
        <div className="report-content">
          <h2>Report Content</h2>
          <ReportProgress/>
        </div>
      </>
    );
  }
}

export default Report;
