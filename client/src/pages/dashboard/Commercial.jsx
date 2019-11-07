import React, { Component } from 'react';

class Commercial extends Component {

  state = {
    intervalId: null,
    timeRemaining: null,
  };

  componentDidMount() {
    const intervalId = setInterval(this.setTime, 1000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    this.setTime();
    clearInterval(this.state.intervalId);
  }

  setTime = () =>{
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setDate(now.getDate()+1);
    const today = now.getTime();

    const gap = Math.round((today-new Date().getTime())/1000);

    const D = Math.floor(gap / 86400);
    const H = Math.floor((gap - D * 86400) / 3600 % 3600);
    const M = Math.floor((gap - H * 3600) / 60 % 60);
    const S = Math.floor((gap - M * 60) % 60);

    this.setState({
      timeRemaining: `${this.pad(H, 2)}:${this.pad(M, 2)}:${this.pad(S, 2)}`
    });
  };

  pad = (n, width) => {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-4 text-right align-self-center">
            <div className="commercial-font">
              오늘의 머니독
            </div>
            <div className="commercial-font">
              스페셜 오퍼
            </div>
            <div className="commercial-time">
              {this.state.timeRemaining} 남음
            </div>
          </div>
          <div className="col-md">
            <img className="commercial-img" src={`${process.env.REACT_APP_IMAGE_URI}/img/commercial.png`}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Commercial;
