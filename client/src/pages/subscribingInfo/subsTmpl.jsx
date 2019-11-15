import React, { Component } from 'react';
import { Select, Icon, Input} from 'antd';
const { Option } = Select;
const InputGroup = Input.Group;

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
      },
      billingCycle: '1월 구독료',
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
      return (<button className="logo-Btn" style={{'background': subsAppInfo.color}}>{subsAppInfo.name[0].toUpperCase()}</button>);
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
        <div className="container user-info-elements">
          <div className="row align-items-center">

            {/* 사진 */}
            <div className="logo col-sm-1 padding-zero">
              {this.showSubscibeImg(info)}
            </div>

            <div className="col padding-zero">
              <div className="row top-border">


                <div className="col-2 padding-zero align-self-center">
                  <div className="row">

                    {/* 서비스 이름 */}
                    <div className="col-5 serviceName text-left padding-zero">
                      {info.name}
                    </div>
                    {/* 카테고리*/}
                    <div className="col service-sub-Name text-left padding-zero">
                      엔터테인먼트
                    </div>

                  </div>
                </div>

                <div className="col-8 padding-zero align-self-center">
                  <div className="row">

                    {/* 결제 주기*/}
                    <div className="col-2 text-left padding-zero">
                      <Select defaultValue="month" className="select-box verticle-middle"
                        suffixIcon={<Icon type="caret-down" />}>
                        <Option value="month">월 구독료</Option>
                        <Option value="quarter">분기 구독료</Option>
                        <Option value="halfYear">반년 구독료</Option>
                        <Option value="year">년 구독료</Option>
                      </Select>
                    </div>
                    {/* 가격정보*/}
                    <div className="col-3 text-right padding-zero">
                      <InputGroup compact>
                        <Input className="text-left" style={{ width: '50%' }} defaultValue="" placeholder="0" />
                        <Select defaultValue="won" style={{ width: '30%' }} className="select-box text-right"
                          suffixIcon={<Icon type="caret-down" />}>
                          <Option value="won">원</Option>
                          <Option value="dollar">달러</Option>
                          <Option value="euro">유로</Option>
                        </Select>
                      </InputGroup>
                    </div>

                    {/* 달력*/}
                    <div className="col-4  padding-zero">
                      <InputGroup compact>
                        <Input style={{ width: '25%' }} defaultValue="결제일" disabled={true}/>
                        <DatePickers date={this.state.dateObject.date} onDatePickerChange={this.onDatePickerChange}/>
                      </InputGroup>
                    </div>

                    {/* 결제 채널*/}
                    <div className="col-3 text-left padding-zero">
                      <InputGroup compact>
                        <Input style={{ width: '40%' }} defaultValue="결제방식" disabled={true}/>
                        <Select defaultValue="app" className="select-box"
                          suffixIcon={<Icon type="caret-down" />}>
                          <Option value="app">앱</Option>
                          <Option value="web">웹</Option>
                        </Select>
                      </InputGroup>
                    </div>

                  </div>
                </div>

                {/* <div className="col padding-zero">*/}
                {/*  <div className="row">*/}
                {/*    */}
                {/*  </div>*/}
                {/* </div>*/}


                {/* /!* 결제 금액 *!/*/}
                {/* <div className="price col ">*/}
                {/*  <div className="input-group input-group-sm">*/}
                {/*    <div className="input-group-prepend">*/}
                {/*      <span className="input-group-text" id="inputGroup-sizing-sm">&#8361;</span>*/}
                {/*    </div>*/}
                {/*    <input*/}
                {/*      type="text"*/}
                {/*      id="price"*/}
                {/*      className="form-control"*/}
                {/*      data-id={info.name}*/}
                {/*      value={inputData.price}*/}
                {/*      onChange={this.handleChange}*/}
                {/*      placeholder="결제 금액"*/}
                {/*      aria-label="Amount (to the nearest dollar)"*/}
                {/*    />*/}
                {/*  </div>*/}
                {/* </div>*/}


                {/* 결제 채널 */}
                {/* <div className="radio col">*/}
                {/*  <div className="form-check form-check-inline">*/}
                {/*    <input*/}
                {/*      type="radio"*/}
                {/*      className="channel"*/}
                {/*      name={info.name}*/}
                {/*      id={inappId}*/}
                {/*      data-id={info.name}*/}
                {/*      value="in-app"*/}
                {/*      onChange={this.handleChange}*/}
                {/*    />*/}
                {/*    <label className="form-check-label" id="label-text" htmlFor={inappId}>&nbsp;IN-APP</label>*/}
                {/*  </div>*/}

                {/*  <div className="form-check form-check-inline">*/}
                {/*    <input*/}
                {/*      type="radio"*/}
                {/*      className="channel"*/}
                {/*      name={info.name}*/}
                {/*      id={siteId}*/}
                {/*      data-id={info.name}*/}
                {/*      value="site"*/}
                {/*      onChange={this.handleChange}*/}
                {/*    />*/}
                {/*    <label className="form-check-label" id="label-text" htmlFor={siteId}>&nbsp;SITE</label>*/}
                {/*  </div>*/}
                {/* </div>*/}

                <div className="logo col padding-zero">
                  <button onClick={() =>this.deleteSubs} type="button" className="btn btn-sm btn-outline-info">삭제</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </>
    );
  }
}

export default SubsTmpl;
