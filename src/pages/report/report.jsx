import React, {Component} from 'react';

import './report.css';
import {connect} from 'react-redux';
import SubscriptionList from './SubscriptionList';
import MontlyReport from './MontlyReport';

class Report extends Component {
  state = {
    totalPay: '-',
    currency: '₩',
    month: new Date().getMonth() +1,
    mostUsed: '-',
    mostUnused: '-'
  };

  componentDidMount() {
    this.initialState();
  }

  initialState = () =>{
    let totalPay = 0;
    this.props.subscriptions.map(
      (content) =>{
        totalPay += content.price;
      });
    this.setState({
      totalPay: totalPay,
    });
  };


  render() {
    return (
      <>
        <div className="container main-container">
          <div className="row">

            <div className="col-sm-6 report-inner-container">
              <MontlyReport data={this.state}/>
              <SubscriptionList data={this.props.subscriptions}/>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  subscriptions: state.users.subscriptions,
});

export default connect(mapStateToProps)(Report);
