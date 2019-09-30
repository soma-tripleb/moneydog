import React, {Component} from 'react';

import {Calendar} from 'antd';
import moment from 'moment';

class CalendarClass extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (value) => {
    this.props.handleChange(value);
  };

  getListData = (value, subscriptions) => {
    // console.log('value1: ', moment(value._d).format('YYYY/MM/DD'));

    let listData = [];
    subscriptions.map((subscription) => {
      if (moment(subscription.renewal).date() === value.date() && subscription.renewal !== undefined) {
        listData = [{type: subscription.logo}];
      }
    });
    return listData;
  };

  dateCellRender = (value) => {
    const subscriptions = this.props.data;
    const listData = this.getListData(value, subscriptions);

    const calendarDate = moment(value._d).format('YYYY/MM/DD');

    subscriptions.map((subscription) => {
      const subsDate = moment(subscription.paymentDate).format('YYYY/MM/DD');

      if (subsDate === calendarDate) {
        console.log(subscription.name);
        console.log(subscription.logo);
        console.log(subsDate);
      }
    });

    return (
      <ul className="events">
        {
          listData.map((item) => (
            <li key={item.type}>
              <img className="subscribeImg" src={'/' + item.type} alt='img not found' />
            </li>
          ))
        }
      </ul>
    );
  };

  getMonthData = (moment) => {
    if (moment.month() === 8) {
      return 1394;
    }
  };

  monthCellRender = (value) => {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  render() {
    if (this.props.data == null) {
      return null;
    }
    return (
      <div>
        <p><u> 월별 결제일 정보 </u></p>
        <Calendar
          fullscreen={false}
          dateCellRender={this.dateCellRender}
          monthCellRender={this.monthCellRender}
          onSelect={this.handleChange}
        />
      </div>
    );
  }
}

export default CalendarClass;
