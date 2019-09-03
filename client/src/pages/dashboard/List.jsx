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

  state = {
    result: null
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const subscriptions = nextProps.data.subscriptions;
    subscriptions.filter((subscription) => {
      if (moment(subscription.renewal).date() === nextProps.date) {
        this.state.result = subscription;
      } else {
        this.state.result = null;
      }
    });
  }

  render() {
    if (this.props.data == null) {
      const icon = <Icon type="loading" style={{ fontSize: 24}} spin />
      return (<Spin indicator={icon} />);
    }

    return(
     <div>
       <div className='row img-back'>
         <div className='col-3'>
           <h3>{this.props.date}일</h3>
         </div>
       </div>
       <div className='img-border'>
         <img className="line-Img" src={Melon} alt="First slide" style={{height: '5vh', borderRadius: '5px'}}/>
       </div>
       <div>{this.state.result ? this.state.result.name : "" }</div>
     </div>
    );
  }
}

export default List;
