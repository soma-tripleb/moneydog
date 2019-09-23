import React, {Component} from 'react';

import moment from 'moment';

import './List.css';
import {Icon, Spin} from 'antd';

class List extends Component {
  constructor(props) {
    super(props);
  };

  state = {
    result: null,
  };

  // componentWillReceiveProps(nextProps, nextContext) {
  //   const subscriptions = nextProps.data;
  //   subscriptions.some((subscription) => {
  //     if (moment(subscription.renewal).date() === nextProps.date) {
  //       return this.state.result = subscription;
  //     } else {
  //       return this.state.result = '';
  //     }
  //   });
  // }

  render() {
    if (this.props.data == null) {
      const icon = <Icon type="loading" style={{fontSize: 24}} spin />;
      return (<Spin indicator={icon} />);
    }

    return (
      <div>
        <div className='row img-back'>
          <div className='col-3'>
            <h3>{this.props.date}일</h3>
          </div>
        </div>
        <div className='img-border'>
          <img className="line-Img" alt='img not found' style={{height: '5vh', borderRadius: '5px'}}/>
        </div>
        <div>{this.state.result ? this.state.result.name : '' }</div>
      </div>
    );
  }
}

export default List;
