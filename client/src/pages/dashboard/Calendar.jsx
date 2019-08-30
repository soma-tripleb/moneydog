import React, { Component } from 'react';
import { Calendar } from 'antd';
import moment from 'moment';
import './Calendar.css';

import Netflix from '../../static/img/templogo/netflix.png';
import Melon from '../../static/img/templogo/melon.png';
import Tving from '../../static/img/templogo/tving.png';
import Watcha from '../../static/img/templogo/watcha.png';

class CalendarClass extends Component {

  onPanelChange = (value, mode) => {
    console.log('test',value, mode);
  };

  arr = {
    netflix: Netflix,
    Melon: Melon,
    watcha: Watcha,
    TVING: Tving,
  };

  getListData = (value, subscriptions) => {
    let listData;
    subscriptions.map((subscription) => {
      if (moment(subscription.renewal).date() === value.date()) {
        listData = [ {type: subscription.name}];
      }
    });
    return listData || [];
  }

  dateCellRender = (value) => {
    const subscriptions = this.props.data.subscriptions;
    const listData = this.getListData(value, subscriptions);
    return (
        <ul className="events">
          {listData.map(item => (
              <li key={item.type}>
                <img className="subscribeImg" src={this.arr[item.type]}
                     alt={item.type}/>
              </li>
          ))}
        </ul>
    );
  }

  getMonthData = (moment) => {
    if (moment.month() === 8) {
      return 1394;
    }
  }

  monthCellRender = (value) => {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  render() {
    const {data} = this.props;
    if (this.props.data == null) {
      return null;
    }

    return (
      <div>
        <p><u> 월별 결제일 정보 </u></p>
        <Calendar fullscreen={false} onPanelChange={this.onPanelChange}
          dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />
      </div>
    );
  }
}

export default CalendarClass;
