import React, {Component} from 'react';
import {PageHeader, Button, Spin, Icon} from 'antd';

import './Categories.css';
import SubsApp from '../subscribing/subsApp';

class Categories extends Component {
  state = {
    subscriptions: null,
  };
  calLeftDay = (renewal) => {
    const leftTime = new Date(renewal) - new Date(new Date().toISOString().slice(0, 10));
    return (leftTime / (1000 * 3600 * 24));
  };

  sortByPrice = (subscriptions) => {
    // subscriptions.sort((a, b) => (a.price > b.price) ? -1: 1);
    const sortedSubscriptions = Object.assign([], subscriptions).sort((a, b) => (a.price > b.price) ? -1 : 1);
    this.setState({subscriptions: sortedSubscriptions}, () => {
      console.log(this.state);
    });
  };

  sortByLeftDay = (subscriptions) => {
    const sortedSubscriptions = Object.assign([], subscriptions).sort((a, b) => (this.calLeftDay(a) > this.calLeftDay(b)) ? -1 : 1);
    this.setState({subscriptions: sortedSubscriptions}, () => {
      console.log(this.state);
    });
  };

  showUserSubsList = () =>{
    const list = this.props.data.map(
      (data, index) => (
        <div key={index} className="container w-100 p-3" id="inner-element">
          <div className="row">
            <div className="col">
              <img src={'/'+ data.logo} alt={data.name} style={{height: '5vh', borderRadius: '5px', paddingLeft: '0px'}}/>
            </div>
            <div className="col">
              {data.name}
            </div>
            <div className="col">
                  ₩{data.price}
            </div>
            <div className="col">
              {data.paymentDate}(D-{this.countRenualDate(data.paymentDate)})
            </div>
          </div>
        </div>
      )
    );
    return list;
  };

  countRenualDate = (date) => {
    const currentDate = new Date();
    if (currentDate < date) {
      return date - currentDate.getDate();
    } else {
      return (new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0)).getDate() -currentDate.getDate() + date;
    }
  };

  render() {
    const {data} = this.props;

    if (this.props.data == null) {
      const icon = <Icon type="loading" style={{fontSize: 24}} spin />;
      return (<Spin indicator={icon} />);
    }

    return (
      <div>
        {/*  구독 중인 서비스*/}
        <p><u> 구독 중인 서비스 </u></p>
        <PageHeader title="구독 중인 서비스"
          extra={[
            <Button key="2" onClick={() => {this.sortByPrice(data);}}>가격 순</Button>,
            <Button key="1" onClick={() => {this.sortByLeftDay(data);}}>남은 일</Button>,
          ]}>
        </PageHeader>
        <br/>
        <div>
          {this.showUserSubsList()}
        </div>
        <br/>
      </div>
    );
  }
}

export default Categories;
