import React, { Component } from 'react';

import './subscribingInfo.css';

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
        <div className="container" id="subs-temp-container">
          <div className="row">
            <div className="col-sm">
              <img className="logo-img" src={`/` + info.logo} alt="" />
            </div>

            <div className="col-sm">
              <label>결제금액</label>
              <input
                type="text"
                className="price"
                name={priceId}
                data-id={info.name}
                value={inputData.price}
                onChange={this.handleChange}
                placeholder="price"
              />
            </div>

            <div className="col-sm">
              <label>결제일</label>
              <input
                type="text"
                className="paymentDate"
                name={paymentDateId}
                data-id={info.name}
                value={inputData.paymentDate}
                onChange={this.handleChange}
                placeholder="paymentDate"
              />
            </div>

            <div className="radio col-sm">
              <label>
                <input
                  type="radio"
                  className="channel"
                  data-id={info.name}
                  value="inapp"
                  checked={(inputData.channel === 'inapp')}
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
                  checked={(inputData.channel === 'site')}
                  onChange={this.handleChange}
                />
                site
              </label>
            </div>

          </div>
        </div>
      </>
    );
  }
};

export default SubsTmpl;
