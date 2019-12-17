import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Calendar } from 'antd';
import moment from 'moment';

const staticday = ['일', '월', '화', '수', '목', '금', '토', '일'];
const staticMonth = {
  Jan: '1월',
  Feb: '2월',
  Mar: '3월',
  Apr: '4월',
  May: '5월',
  Jun: '6월',
  Jul: '7월',
  Aug: '8월',
  Sep: '9월',
  Oct: '10월',
  Nov: '11월',
  Dec: '12월',
};

class CalendarClass extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    this.setDefaultValue();
  }

  setDefaultValue = () => {
    const calendarNode = ReactDOM.findDOMNode(this);

    if (calendarNode instanceof HTMLElement) {
      const days = calendarNode.querySelectorAll('.ant-fullcalendar-column-header-inner');
      days.forEach((item, index)=>{
        item.innerHTML = staticday[index];
      });

      const dates = calendarNode.querySelectorAll('.ant-fullcalendar-value');
      dates.forEach((item, index)=>{
        if ( item.innerHTML[0] === '0') {
          item.innerHTML = '&nbsp;'+item.innerHTML[1]+'&nbsp;';
        }
      });

      const year = calendarNode.querySelectorAll('.ant-select-selection-selected-value');
      year.forEach((item, index)=>{
        if (staticMonth.hasOwnProperty(item.innerHTML)) {
          item.innerHTML = staticMonth[item.innerHTML];
        } else if (item.innerHTML > 1900 || item.innerHTML < 2100) {
          item.innerHTML += '년';
        }
      });

      const years = calendarNode.querySelectorAll('.ant-select-dropdown-menu-item');
      years.forEach((item, index)=>{
        if (staticMonth.hasOwnProperty(item.innerHTML)) {
          item.innerHTML = staticMonth[item.innerHTML];
        } else if (item.innerHTML > 1900 || item.innerHTML < 2100) {
          item.innerHTML += '년';
        }
      });
    }
  };

  handleChange = (value) => {
    this.props.handleChange(value);
  };

  handleOnChange = (value) =>{
    this.setDefaultValue();
  };

  handleOnPanelChange = (value) => {
    setTimeout(()=>{
      this.setDefaultValue();
    });
  };

  showSubscibeImg = (subsAppInfo) =>{
    return (<button className="calendar-subscriptions-Btn" style={{'background': subsAppInfo.color}}>{subsAppInfo.name[0].toUpperCase()}</button>);
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
              <button className="calendar-subscriptions-Btn" style={{'background': 'white'}}>..</button>
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
          dateCellRender={this.dateCellRender}
          monthCellRender={this.monthCellRender}
          onSelect={this.handleChange}
          onPanelChange={this.handleOnPanelChange}
        />
      </div>
    );
  }
}

export default CalendarClass;
