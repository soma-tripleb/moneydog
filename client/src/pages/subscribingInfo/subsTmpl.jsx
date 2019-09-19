import React, { Component } from 'react';

class SubsTmpl extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.props.onUserInputChange(
      e.target.dataset.id,
      e.target.className,
      e.target.value);
  }

  render() {
    const { info } = this.props;
    const inputData = this.props.inputData;

    const priceId = `price-${info.index}`;
    const paymentDateId = `paymentDate-${info.index}`;

    return (
      <>
        <div>
          <span>SubsTmpl : {info.name} </span>

          <label>결제금액</label>
          <input
            type="text"
            className="price"
            name= {priceId}
            data-id={info.name}
            value={inputData[info.index]}
            onChange={this.handleChange}
            placeholder="price"
          />

          <label>결제일</label>
          <input
            type="text"
            className="paymentDate"
            name={paymentDateId}
            data-id={info.name}
            value={inputData[info.index]}
            onChange={this.handleChange}
            placeholder="paymentDate"
          />

          <div className="radio">
            <label>
              <input
                type="radio"
                className="channel"
                data-id={info.name}
                value="inapp"
                checked={inputData[info.index] === 'inapp'}
                onChange={this.handleChange}
              />
              inapp
            </label>

            <label>
              <input
                type="radio"
                className="channel"
                data-id={info.name}
                value="site"
                checked={inputData[info.index] === 'site'}
                onChange={this.handleChange}
              />
              site
            </label>
          </div>
        </div>
      </>
    );
  }
};

export default SubsTmpl;
