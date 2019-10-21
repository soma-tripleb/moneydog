import React, { Component } from 'react';

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
      console.log(subsAppInfo.color);
      return (<button className="logo-Btn" style={{'background': subsAppInfo.color}}>{subsAppInfo.name[0]}</button>);
    } else {
      return (<img className="list-logo-img" src={`${process.env.REACT_APP_IMAGE_URI}` + subsAppInfo.logoURI} alt="x" />);
    }
  };


  render() {
    const {logoURI, name, price, paymentDate} = this.props.data;
    const paymentDateFormat = this.dataFormat(paymentDate); // YYYY-MM-DD

    return (
      <>
        <div className="container w-100" id="inner-element">
          <div className="row">
            <div className="col">
              {this.showSubscibeImg(this.props.data)}
            </div>
            <div className="col">
                  ₩ {this.numberWithCommas(price)}
            </div>
            <div className="col">
              {paymentDateFormat}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Item;
