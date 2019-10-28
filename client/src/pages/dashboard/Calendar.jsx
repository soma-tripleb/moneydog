import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Calendar } from 'antd';
import moment from 'moment';

const staticday = ['일', '월', '화', '수', '목', '금', '토', '일'];

class CalendarClass extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const calendarNode = ReactDOM.findDOMNode(this);

    if (calendarNode instanceof HTMLElement) {
      const days = calendarNode.querySelectorAll('.ant-fullcalendar-column-header-inner');
      days.forEach((item, index)=>{
        item.innerHTML = staticday[index];
      });
      const dates = calendarNode.querySelectorAll('.ant-fullcalendar-value');
      dates.forEach((item, index)=>{
        if ( item.innerHTML[0] === '0'){
          item.innerHTML = item.innerHTML[1];
        }
      });
    }
  }

  handleChange = (value) => {
    this.props.handleChange(value);
  };

  showSubscibeImg = (subsAppInfo) =>{
    if (subsAppInfo.logoURI === '') {
      return (<button className="calendar-subscriptions-Btn" style={{'background': subsAppInfo.color}}>{subsAppInfo.name[0]}</button>);
    } else {
      return (<img className="calendar-subscriptions-img" src={`${process.env.REACT_APP_IMAGE_URI}` + subsAppInfo.logoURI} alt="x" />);
    }
  };

  dateCellRender = (value) => {
    const subscriptions = this.props.data;

    const dateMatchedSubscriptions = [];
    const calendarDate = value._d.getDate();

    subscriptions.map((subscription) => {
      const subsDate = moment(subscription.paymentDate, 'YYYY/MM/DD').date();
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
              {this.showSubscibeImg(showCalendarSubscriptions)}
            </li>
          </ul>
        );
        break;
      default:
        result = (
          <ul className="events">
            <li key={showCalendarSubscriptions.seq}>
              {this.showSubscibeImg(showCalendarSubscriptions)}
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
          // fullscreen={false}
          dateCellRender={this.dateCellRender}
          monthCellRender={this.monthCellRender}
          onSelect={this.handleChange}
        />
      </div>
    );
  }
}

export default CalendarClass;
