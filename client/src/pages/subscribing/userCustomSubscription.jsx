import React, { Component } from 'react';
import update from 'react-addons-update';

class userCustomSubscription extends Component {

  state = {
    customServiceArray: [
      {
        serviceName: '',
      }
    ],
  };

  handleClick = (i) => {
    const {onInsert} = this.props;
    const serviceName = this.state.customServiceArray[i].serviceName;

    if (serviceName === '') {
      alert('서비스 이름을 입력해주세요');
      return;
    }
    onInsert(btoa(serviceName), '', serviceName);
  };

  changeServiceName = (e, i) =>{
    e.preventDefault();
    const {customServiceArray} = this.state;

    this.setState({
      customServiceArray: update(
        customServiceArray, {
          [i]: {
            serviceName: {$set: e.target.value}
          }
        }
      )
    });
  };

  focusInServiceName = (i) =>{
    const {customServiceArray} = this.state;
    const Value = customServiceArray[i];
    if (Value.serviceName !== '') {
      return;
    }
    this.setState({
      customServiceArray: update(
        customServiceArray, {
          $push: [{serviceName: ''}]
        }
      )
    });
  };

  focusOutServiceName = (i) => {
    const {customServiceArray} = this.state;

    const removeValue = customServiceArray[i];
    if (removeValue.serviceName !== '') {
      return;
    }
    this.setState({
      customServiceArray: update(
        customServiceArray, {$splice: [[i, 1]]}
      )
    });
  };

  showCustomService = () =>{

    const {customServiceArray} = this.state;

    const customServiceList = customServiceArray.map(
      (Service, idx) => (

        <div key={idx} className="container w-100" id="inner-element">
          <div className="row">
            <div className="col">
              <img className="logo-img" src={`${process.env.REACT_APP_IMAGE_URI}` + '/moneydog_black.png'} alt="x" />
            </div>
            <div className="col">
              <input type="text" className="form-control"
                value={Service.serviceName}
                onChange={(e) => this.changeServiceName(e, idx)}
                onFocus={() => this.focusInServiceName(idx)}
                onBlur={() => this.focusOutServiceName(idx)}
                placeholder="Service Name"/>
            </div>
            <div className="col">
              <button onClick={() =>this.handleClick(idx)} type="button" className="btn btn-outline-secondary">+</button>
            </div>
          </div>
        </div>
      )
    );
    return customServiceList;
  };

  render() {
    return (
      <>
        {this.showCustomService()}
      </>
    );
  }
}

export default userCustomSubscription;
