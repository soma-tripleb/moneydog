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

  dateCellRender = (value) => {
    const subscriptions = this.props.data;

    const dateMatchedSubscriptions =[];
    const calendarDate = moment(value._d).format('DD');

    subscriptions.map((subscription) => {
      const subsDate = moment(subscription.paymentDate).format('DD');

      if (subsDate === calendarDate) {
        console.log(subscription);
        console.log(subscription.name);
        console.log(subscription.logo);
        console.log(subsDate);

        dateMatchedSubscriptions.push(subscription);
      }
    });

    return (
      <ul className="events">
        {
          dateMatchedSubscriptions.map((subscriptions) => (
            <li key={subscriptions.seq}>
              <img className="calendar-subscriptions-img" src={'/' + subscriptions.logo} alt='x' />
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

  mode = (month, year) => {
    console.log(month, year);
  }

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
