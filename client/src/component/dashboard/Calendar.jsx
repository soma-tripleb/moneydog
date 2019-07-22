import React, {Component} from 'react';
import { Calendar, Badge } from 'antd';

class CalendarClass extends Component {

  onPanelChange = (value, mode) => {
    console.log(value, mode);
  };

  render() {
    return (
        <div>
          <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
        </div>
    );
  }
}

export default CalendarClass;
