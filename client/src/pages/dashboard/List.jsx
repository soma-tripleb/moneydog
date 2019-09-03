import React, { Component, PropTypes } from 'react';

import youtube from '../../static/img/templogo/youtube.png';
import Netflix from '../../static/img/templogo/netflix.png';
import Melon from '../../static/img/templogo/melon.png';
import Tving from '../../static/img/templogo/tving.png';
import Watcha from '../../static/img/templogo/watcha.png';
import moment from 'moment';

import './List.css';
import {Icon, Spin} from "antd";

class List extends Component {
    constructor(props) {
    super(props);
  };

  matchDate = (selectedValue, user) => {
    const subscriptions = user.subscriptions;
    return subscriptions.map((subscription) => {
      if (moment(subscription.renewal).date() === selectedValue) {
        return subscription;
      };
    });
  };

  render() {
    if (this.props.data == null) {
      const icon = <Icon type="loading" style={{ fontSize: 24}} spin />
      return (<Spin indicator={icon} />);
    }
    const result = this.matchDate(this.props.date, this.props.data);
    console.log('selected date result : ',result);
    return(
     <div>
       <div className='row img-back'>
         <div className='col-3'>
           <h3>{this.props.date}일</h3>
         </div>
       </div>
       <div className='img-border'>
         <img className="line-Img" src={Melon}
              alt="First slide" style={{height: '5vh', borderRadius: '5px'}}/>
       </div>
     </div>
    );
  }
}

export default List;
