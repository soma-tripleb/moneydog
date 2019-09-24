import React, { Component } from 'react';

import { Input } from 'antd';

import DatePickers from './DatePicker';

import './subscribingInfo.css';

class SubsTmpl extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      dateObject: {
        className: 'paymentDate',
        dataId: '',
        date: '',
      }
    };
  }

  componentDidMount = () => {
    const subsName = this.props.info.name;

    this.setState({
      dateObject: {
        ...this.state.dateObject,
        dataId: subsName,
      }
    });
  }

  handleChange = (e) => {
    const dateObj = this.state.dateObject;

    if (e === undefined) {
      console.log(dateObj);

      this.props.onUserInputChange(
        dateObj.dataId,
        dateObj.className,
        dateObj.date
      );
    } else {
      console.log(e.target);

      let classNameTemp = '';

      if (e.target.id === 'price')
        classNameTemp = e.target.id;
      else
        classNameTemp = e.target.className;

      this.props.onUserInputChange(
        e.target.dataset.id,
        classNameTemp,
        e.target.value,
      );
    }
  }

  onDatePickerChange = (date) => {
    this.setState({
      dateObject: {
        ...this.state.dateObject,
        date: date,
      },
    }, () => {
      this.handleChange();
    });
  }

  render() {
    const { info } = this.props;
    const inputData = this.props.inputData;

    const inappId = `inapp-${info.name}`;
    const siteId = `site-${info.name}`;

    return (
      <>
        <div className="container" id="subs-temp-container">
          <div className="row align-items-center">

            {/* 사진 */}
            <div className="logo col-xs-6 col-sm-3">
              <img className="logo-img" src={`/` + info.logo} alt="" />
            </div>

            {/* 결제 금액 */}
            <div className="price col-xs-6 col-sm-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">&#8361;</span>
                </div>
                <input
                  type="text"
                  id="price"
                  className="form-control"
                  data-id={info.name}
                  value={inputData.price}
                  onChange={this.handleChange}
                  placeholder="결제 금액"
                  aria-label="Amount (to the nearest dollar)"
                />
                {/* <div class="input-group-append">
                  <span class="input-group-text">.00</span>
                </div> */}
              </div>
            </div>

            {/* 결제일 */}
            <div className="payment-date col-xs-6 col-sm-3">
              <DatePickers
                onDatePickerChange={this.onDatePickerChange}
              ></DatePickers>
            </div>

            {/* 결제 채널 */}
            <div className="radio col-xs-6 col-sm-3">
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="channel"
                  name={info.name}
                  id={inappId}
                  data-id={info.name}
                  value="inapp"
                  onChange={this.handleChange}
                />
                <label className="form-check-label" htmlFor={inappId}>&nbsp;IN-APP</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="channel"
                  name={info.name}
                  id={siteId}
                  data-id={info.name}
                  value="site"
                  onChange={this.handleChange}
                />
                <label className="form-check-label" htmlFor={siteId}>&nbsp;SITE</label>
              </div>
            </div>

          </div>
        </div>
      </>
    );
  }
};

export default SubsTmpl;
