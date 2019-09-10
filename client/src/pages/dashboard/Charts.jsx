import React, {Component} from 'react';
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';

class Charts extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    data: [
      {name: '5', uv: 4000, pv: 2400, amt: 2400},
      {name: '6', uv: 3000, pv: 1398, amt: 2210},
      {name: '7', uv: 2000, pv: 9800, amt: 2290},
      {name: '8', uv: 2780, pv: 3908, amt: 2000},
      {name: '9', uv: 1890, pv: 4800, amt: 2181},
      {name: '10', uv: 2390, pv: 3800, amt: 2500},
      {name: '11', uv: 3490, pv: 4300, amt: 2100},
    ],
  };


  render() {
    return (
        <>
          <p><u> 월별 결제 금액 (전체 구독 앱) </u></p>
          <LineChart width={500} height={300} data={this.state.data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8"/>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Line type="monotone" dataKey="pv" stroke="#000" activeDot={{r: 8}}/>
          </LineChart>
        </>
    );
  }
}

export default Charts;
