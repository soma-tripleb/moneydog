import React, { Component } from 'react';

import { Calendar } from 'antd';
import moment from 'moment';

import { something as SOMETHING_IMG } from '../../../resources/static/img/templogo/index';

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

    const dateMatchedSubscriptions = [];
    const calendarDate = moment(value._d).format('DD');

    subscriptions.map((subscription) => {
      const subsDate = moment(subscription.paymentDate).format('DD');

      if (subsDate === calendarDate) {
        dateMatchedSubscriptions.push(subscription);
      }
    });

    const dmsLength = dateMatchedSubscriptions.length;
    const showCalendarSubscriptions = dateMatchedSubscriptions[0];

    let result = '';

    switch (dmsLength) {
      case 0:
        break;
      case 1:
        result = (
          <ul className="events">
            <li key={showCalendarSubscriptions.seq}>
              <img className="calendar-subscriptions-img" src={`${process.env.REACT_APP_IMAGE_URI}` + showCalendarSubscriptions.logoURI} alt='x' />
            </li>
          </ul>
        );
        break;
      default:
        result = (
          <ul className="events">
            <li key={showCalendarSubscriptions.seq}>
              <img className="calendar-subscriptions-img front" src={`${process.env.REACT_APP_IMAGE_URI}` + showCalendarSubscriptions.logoURI} alt='x' />
              <img className="calendar-subscriptions-img back" src={`${process.env.REACT_APP_IMAGE_URI}` + '/subscriptionLogo/something.png'} alt='x' />
            </li>
          </ul>
        );
        break;
    }

    return result;
  };

  render() {
    if (this.props.data == null)
      return null;

    return (
      <div>
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
