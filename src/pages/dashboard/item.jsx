import React, { Component } from 'react';

class Item extends Component {
  countRenualDate = (date) => {
    const currentDate = new Date();
    if (currentDate < date) {
      return date - currentDate.getDate();
    } else {
      return (new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0)).getDate() -currentDate.getDate() + date;
    }
  };

  dataFormat = (date) => {
    const result = date.split('T');

    return result[0];
  };

  render() {
    const {logo, name, price, paymentDate} = this.props.data;
    const paymentDateFormat = this.dataFormat(paymentDate); // YYYY-MM-DD

    return (
      <>
        <div className="container w-100 p-3" id="inner-element">
          <div className="row">
            <div className="col">
              <img className="categories-inner-item-image" src={'/'+ logo} alt={name}/>
            </div>
            <div className="col">
                  ₩{price}
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
