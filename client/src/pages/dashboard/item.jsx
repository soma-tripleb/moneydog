import React, { Component } from 'react';
import moment from 'moment';

class Item extends Component {

  dataFormat = (date) => {
    const result = date.split('T');
    return result[0];
  };

  numberWithCommas = (number) => {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  showSubscibeImg = (subsAppInfo) =>{
    if (subsAppInfo.logoURI === '') {
      return (<button className="logo-Btn" style={{'background': subsAppInfo.color}}>{subsAppInfo.name[0]}</button>);
    } else {
      return (<img className="list-logo-img" src={`${process.env.REACT_APP_IMAGE_URI}` + subsAppInfo.logoURI} alt="x" />);
    }
  };

  show

  render() {
    const {logoURI, name, price, paymentDate} = this.props.data;
    const paymentDateFormat = this.dataFormat(paymentDate); // YYYY-MM-DD

    return (
      <>
        <div className="row">
          <div className="col-md-2 subscribe-img-element">
            <div className="col">
              {this.showSubscibeImg(this.props.data)}
            </div>
          </div>
          <div className="col subscribe-element item-border align-self-center">
            <div className="container w-100 align-self-center">
              <div className="row">
                <div className="col item-bold">
                  {name}
                </div>
                <div className="col">
                  엔터테인먼트
                </div>
                <div className="col item-bold">
                  월{this.numberWithCommas(price)}원
                </div>
                <div className="col">
                  매달 {moment(paymentDate, 'YYYY/MM/DD').date()}일
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Item;
