import React, {Component} from 'react';

import './report.css';
import {connect} from 'react-redux';
import SubscriptionList from './SubscriptionList';
import MontlyReport from './MontlyReport';
import ThreeMontlyInfo from './ThreeMontlyInfo';

class Report extends Component {
  state = {
    currency: '₩',
    month: new Date().getMonth() +1,
  };


  render() {
    return (
      <>
        <div className="container main-container">
          <div className="row">
            <div className="col-sm-8 report-container">
              <div className="col-sm page foldtl report-inner-container">

                <div className="row report-padding">
                  <div className="col-sm-2">
                    <img className="report-logoImg" src={`${process.env.REACT_APP_IMAGE_URI}/img/MDBlackIcon.png`} alt="Generic placeholder image"/>
                  </div>
                  <div className="col-sm align-self-center text-left">
                    <div className="report-title">MoneyDog Report</div>
                  </div>
                </div>

                <div className="report-padding">
                  <SubscriptionList data={this.props.subscriptions}/>
                </div>

                <div className="report-padding">
                  <MontlyReport props={this.state} data={this.props.subscriptions}/>
                </div>

                <div className="report-padding">
                  <ThreeMontlyInfo/>
                </div>


              </div>
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
