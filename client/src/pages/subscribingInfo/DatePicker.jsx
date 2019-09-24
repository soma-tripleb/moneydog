import React, { Component } from 'react';
import DateUtil from '../util/dateUtil';

import { DatePicker } from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';

const NOW = DateUtil.NOW();

class DatePickers extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  // 두번째 파라미터가 원하는 순수 'date' 값 - ant.disign ('date picker')
  handleChange = (dateSet, date) => {
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
            style={{width: '100%'}}
          />
        </div>
      </>
    );
  }
};

export default DatePickers;
