import React, {Component} from 'react';

import Item from './item';
import {PageHeader, Spin, Icon} from 'antd';
import moment from 'moment';

class Categories extends Component {
  state = {
    subscriptions: null,
  };

  showUserSubsList = () =>{
    let list = null;
    if (this.props.isFullMode) {
      list = this.props.data.map(
        (data, index) => (
          <Item key={index} data={data}/>
        )
      );
    } else {
      list = this.props.data.map(
        (data, index) => {
          if (moment(data.paymentDate, 'YYYY/MM/DD').date() === this.props.date) {
            return (<Item key={index} data={data}/>)
          }
        }
      );
    }
    return list;
  };

  render() {
    if (this.props.data == null) {
      const icon = <Icon type="loading" style={{fontSize: 24}} spin />;
      return (<Spin indicator={icon} />);
    }

    return (
      <div>
        <div>
          <div className="row">
            <div className="col-md-2 subscribe-element">
            </div>
            <div className="col subscribe-element item-border">
              <div className="container w-100 ">
                <div className="row">
                </div>
              </div>
            </div>
          </div>
          {this.showUserSubsList()}
        </div>
      </div>
    );
  }
}

export default Categories;
