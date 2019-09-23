import React, { Component } from 'react';

import { DatePicker } from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';

const NOW = (() => {
  const nowDate = 
    new Date().toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '')
      .split(' ');

  return nowDate[0]
    .replace(/-/gi, '/');
})();

class DatePickers extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  // 두번째 파라미터가 원하는 순수 'date' 값
  handleChange = (dateSet, date) => {
    console.log('DATE PICKER: ', date);

    this.props.onDatePickerChange(date);
  }

  render() {
    return (
      <>
        <div>
          <DatePicker
            defaultValue={moment(NOW, dateFormat)}
            format={dateFormat}
            onChange={this.handleChange}
          />
        </div>
      </>
    );
  }
};

export default DatePickers;
