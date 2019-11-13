import React, {Component} from 'react';

import './report.css';
import {connect} from 'react-redux';
import SubscriptionList from './SubscriptionList';
import MontlyReport from './MontlyReport';
import ThreeMontlyInfo from './ThreeMontlyInfo';
import Item from '../dashboard/item';

class Report extends Component {

  state = {
    currency: '₩',
    month: new Date().getMonth() +1,
  };

  showUserSubsList = () =>{
    const list = this.props.subscriptions.map(
      (data, index) => (
        <Item key={index} data={data}/>
      )
    );

    return list;
  };

  render() {
    return (
      <>
        <div className="container main-container">
          <div className="row">
            <div className="col-sm-8 report-container report-inner-container">
              {/* <div className="row">*/}
              <div className="col-sm ">

                <div className="row">
                  <div className="col-sm-2">
                    <img className="report-logoImg" src={`${process.env.REACT_APP_IMAGE_URI}/img/MDBlackIcon.png`} alt="Generic placeholder image"/>
                  </div>
                  <div className="col-sm align-self-center text-left">
                    <div className="report-title">11월 머니독 리포트</div>
                  </div>
                </div>

                <div className="report-padding">
                  <MontlyReport props={this.state} data={this.props.subscriptions}/>
                </div>
                <div className="report-padding">
                  <ThreeMontlyInfo/>
                </div>

                <div className="report-padding">
                  {/* <SubscriptionList data={this.props.subscriptions}/>*/}
                  {this.showUserSubsList()}
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
