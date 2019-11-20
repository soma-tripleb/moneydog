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

  state = {
    date: null,
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      date: nextProps.date,
    });
  }

  // 두번째 파라미터가 원하는 순수 'date' 값 - ant.disign ('date picker')
  handleChange = (dateSet, date) => {
    this.props.onDatePickerChange(date);
  };

  render() {
    if (this.state.date === null) {
      return (<></>);
    }

    return (
      <>
        <DatePicker
          className="verticle-middle DatePicker"
          defaultValue={moment([moment().year(), moment().month(), this.state.date])}
          format={dateFormat}
          onChange={this.handleChange}
        />
      </>
    );
  }
};

export default DatePickers;
