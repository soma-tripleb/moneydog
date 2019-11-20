import React, {Component} from 'react';

import Item from './item';
import {Spin, Icon} from 'antd';
import moment from 'moment';

class Categories extends Component {
  state = {
    subscriptions: null,
    componentCount: 0,
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
          if (moment(data.paymentDate, 'YYYY/MM/DD').date() === moment(this.props.date, 'YYYY-MM-DD').date()) {
            return (<Item key={index} data={data}/>);
          }
        }
      );
    }

    return list;
  };

  countComponentNumber = () =>{
    let count = 0;

    if (this.props.isFullMode) {
      count = this.props.data.length;
    } else {
      this.props.data.map(
        (data) => {
          if (moment(data.paymentDate, 'YYYY/MM/DD').date() === this.props.date) {
            count++;
          }
        }
      );
    }
    return count;
  };

  showWhiteSpace = ()=>{
    if (this.countComponentNumber() < 2) {
      return (<img className="whitespaceImg" src={`${process.env.REACT_APP_IMAGE_URI}/img/whitespace1.png`} alt=""/>);
    }
    else if (this.countComponentNumber() < 4) {
      return (<img className="whitespaceImg" src={`${process.env.REACT_APP_IMAGE_URI}/img/whitespace2.png`} alt=""/>);
    }
  };

  render() {
    if (this.props.data == null) {
      const icon = <Icon type="loading" style={{fontSize: 24}} spin />;
      return (<Spin indicator={icon} />);
    }

    this.countComponentNumber();

    return (
      <div>
        <div className="categories-padding-right">
          <div className="row ">
            <div className="col-2 subscribe-element-padding">
            </div>
            <div className="col subscribe-img-element item-border ">
              <div className="container w-100 ">
                <div className="row">
                </div>
              </div>
            </div>
          </div>
          {this.showUserSubsList()}
          {this.showWhiteSpace()}

        </div>
      </div>
    );
  }
}

export default Categories;
