import React, { Component } from 'react';

import DatePickers from './DatePicker';

import './subscribingInfo.css';
import moment from 'moment';

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

  componentDidMount() {
    const subsName = this.props.info.name;
    const subsPaymentDay = this.props.info.paymentDate;
    const paymentDay = moment(subsPaymentDay, 'YYYY-MM-DD').date();


    this.setState({
      dateObject: {
        ...this.state.dateObject,
        dataId: subsName,
        date: paymentDay,
      }
    });
  };

  handleChange = (e) => {
    console.log('change');
    const dateObj = this.state.dateObject;

    if (e === undefined) {
      this.props.onUserInputChange(
        dateObj.dataId,
        dateObj.className,
        dateObj.date
      );
    } else {
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
  };

  onDatePickerChange = (date) => {
    this.setState({
      dateObject: {
        ...this.state.dateObject,
        date: date,
      },
    }, () => {
      this.handleChange();
    });
  };

  showSubscibeImg = (subsAppInfo) =>{
    if (subsAppInfo.logoURI === '') {
      return (<button className="logo-Btn" style={{'background': subsAppInfo.color}}>{subsAppInfo.name[0]}</button>);
    } else {
      return (<img className="logo-img" src={`${process.env.REACT_APP_IMAGE_URI}` + subsAppInfo.logoURI} alt="x" />);
    }
  };

  deleteSubs = (e) =>{
    e.preventDefault();
    this.props.DeleteSubs(this.props.info.name);
  };

  render() {
    const { info } = this.props;
    const inputData = this.props.inputData;

    const inappId = `inapp-${info.name}`;
    const siteId = `site-${info.name}`;

    return (
      <>
        <div className="container w-100 p-2" id="user-info-elements">
          <div className="row align-items-center">

            {/* 사진 */}
            <div className="logo col-sm-1">
              {this.showSubscibeImg(info)}
            </div>

            {/* 결제 금액 */}
            <div className="price col-xs-3 col-sm-3">
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">&#8361;</span>
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
              </div>
            </div>

            {/* 결제일 */}
            <div className="payment-date col-xs-6 col-sm-3">
              <DatePickers date={this.state.dateObject.date} onDatePickerChange={this.onDatePickerChange}/>
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
                  value="in-app"
                  onChange={this.handleChange}
                />
                <label className="form-check-label" id="label-text" htmlFor={inappId}>&nbsp;IN-APP</label>
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
                <label className="form-check-label" id="label-text" htmlFor={siteId}>&nbsp;SITE</label>
              </div>
            </div>

            <div className="logo col-sm-2">
              <button onClick={this.deleteSubs} type="button" className="btn btn-outline-danger"> 삭제 </button>
            </div>

          </div>
        </div>
      </>
    );
  }
}

export default SubsTmpl;
