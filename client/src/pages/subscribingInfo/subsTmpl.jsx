import React, { Component } from 'react';

import DatePickers from './DatePicker';

import './subscribingInfo.css';

class SubsTmpl extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      date: '',
    };
  }

  handleChange = (e) => {
    this.props.onUserInputChange(
      e.target.dataset.id,
      e.target.className,
      e.target.value,
      this.state.date
    );
  }

  onDatePickerChange = (date) => {
    this.setState({
      date: date,
    });
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
              <DatePickers
                className="paymentDate"
                name={paymentDateId}
                data-id={info.name}
                onDatePickerChange={this.onDatePickerChange}
                onChange={this.handleChange}
              ></DatePickers>
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
