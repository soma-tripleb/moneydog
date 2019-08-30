import React, { Component } from 'react';
import { Calendar } from 'antd';

import './Calendar.css';

import Netflix from '../../static/img/templogo/netflix.png';
import Melon from '../../static/img/templogo/melon.png';
import Tving from '../../static/img/templogo/tving.png';
import Watcha from '../../static/img/templogo/watcha.png';

class CalendarClass extends Component {

  onPanelChange = (value, mode) => {
    console.log(value, mode);
  };

  arr = {
    netflix: Netflix,
    Melon: Melon,
    watcha: Watcha,
    TVING: Tving,
  };

  getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 5:
        listData = [
          { type: 'netflix'}
        ];
        break;
      case 12:
        listData = [
          { type: 'watcha'}
        ];
        break;
      case 15:
        listData = [
          { type: 'TVING'}
        ];
        break;
      case 22:
        listData = [
          { type: 'Melon'}
        ];
        break;
      default:
    }
    return listData || [];
  }

  dateCellRender = (value) => {
    const listData = this.getListData(value);
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

  getMonthData = (value) => {
    if (value.month() === 8) {
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
