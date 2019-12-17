import React, { Component } from 'react';
import { Select, Icon, Input } from 'antd';
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
        this.props.info.name,
        classNameTemp,
        e.target.value,
      );
    }
  };

  channelHandleChange = (e) => {

    this.props.onUserInputChange(
      this.props.info.name,
      'channel',
      e,
    );

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

  showSubscibeImg = (subsAppInfo) => {
    return (<button className="logo-Btn" style={{ 'background': subsAppInfo.color }}>{subsAppInfo.name[0].toUpperCase()}</button>);
  };

  deleteSubs = (e) => {
    e.preventDefault();
    this.props.DeleteSubs(this.props.info.name);
  };

  render() {
    const { info } = this.props;
    const inputData = this.props.inputData;

    if (info.channel === '') {
      info.channel = 'in-app';
      this.props.onUserInputChange(
        this.props.info.name,
        'channel',
        'in-app',
      );

    }


    return (
      <>
        <div className="container user-info-elements web-display">
          <div className="row align-items-center">

            {/* 사진 */}
            <div className="logo col-sm-1 padding-zero">
              {this.showSubscibeImg(info)}
            </div>

            <div className="col padding-zero">
              <div className="row top-border">


                <div className="col-sm-2 padding-zero align-self-center">
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

                <div className="col-sm-8 padding-zero align-self-center">
                  <div className="row">

                    {/* 결제 주기*/}
                    <div className="col-sm-2 text-left padding-zero">
                      <Select defaultValue="month" className="select-box verticle-middle"
                        suffixIcon={<Icon type="caret-down" />}>
                        <Option value="month">월 구독료</Option>
                        <Option value="quarter">분기 구독료</Option>
                        <Option value="halfYear">반년 구독료</Option>
                        <Option value="year">년 구독료</Option>
                      </Select>
                    </div>
                    {/* 가격정보*/}
                    <div className="col-sm-3 text-right padding-zero">
                      <InputGroup compact>
                        <Input id="price" className="text-left" style={{ width: '50%' }} defaultValue={inputData.price} placeholder="0"
                          onChange={this.handleChange} />
                        <Select defaultValue="won" style={{ width: '30%' }} className="select-box text-right"
                          suffixIcon={<Icon type="caret-down" />}>
                          <Option value="won">원</Option>
                          <Option value="dollar">달러</Option>
                          <Option value="euro">유로</Option>
                        </Select>
                      </InputGroup>
                    </div>

                    {/* 달력*/}
                    <div className="col-sm-4  padding-zero">
                      <InputGroup compact>
                        <Input style={{ width: '25%' }} defaultValue="결제일" disabled={true} />
                        <DatePickers date={this.state.dateObject.date} onDatePickerChange={this.onDatePickerChange} />
                      </InputGroup>
                    </div>

                    {/* 결제 채널*/}
                    <div className="col-sm-3 text-left padding-zero">
                      <InputGroup compact>
                        <Input style={{ width: '40%' }} defaultValue="결제방식" disabled={true} />
                        <Select defaultValue={info.channel} className="select-box"
                          id="channel"
                          suffixIcon={<Icon type="caret-down" />}
                          onChange={this.channelHandleChange}>
                          <Option value="in-app">App</Option>
                          <Option value="site">Web</Option>
                        </Select>
                      </InputGroup>
                    </div>

                  </div>
                </div>

                <div className="logo col-sm padding-zero">
                  <button onClick={this.deleteSubs} type="button" className="btn btn-outline-info btn-delete">삭제</button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* phone*/}
        <div className="container user-info-elements phone-display">
          <div className="row align-items-center">

            <div className="col padding-zero">
              <div className="row top-border">

                <div className="col-sm-2 padding-zero align-self-center">
                  <div className="row">
                    {/* 서비스 이름 */}
                    <div className="col-5 serviceName text-left padding-zero">
                      {this.showSubscibeImg(info)}
                    </div>
                    {/* 카테고리*/}
                    <div className="col service-sub-Name text-left padding-zero">
                      <button onClick={this.deleteSubs} type="button" className="btn btn-outline-info btn-delete">삭제</button>
                    </div>
                  </div>
                </div>

                <div className="col-sm-2 padding-zero align-self-center">
                  <div className="row ">
                    <div className="col-5 serviceName text-left padding-zero">
                      서비스 이름
                    </div>
                    <div className="col service-sub-Name text-left padding-zero">
                      {info.name}
                    </div>
                  </div>
                </div>

                <div className="col-sm-2 padding-zero align-self-center">
                  <div className="row">
                    {/* 서비스 이름 */}
                    <div className="col-5 serviceName text-left padding-zero">
                      카테고리
                    </div>
                    {/* 카테고리*/}
                    <div className="col service-sub-Name text-left padding-zero">
                      엔터테인먼트
                    </div>
                  </div>
                </div>

                <div className="col-sm-2 padding-zero align-self-center">
                  <div className="row">
                    <div className="col-5 serviceName text-left padding-zero">
                      결제 주기
                    </div>
                    {/* 카테고리*/}
                    <div className="col service-sub-Name text-left padding-zero">
                      <Select defaultValue="month" className="select-box verticle-middle"
                        suffixIcon={<Icon type="caret-down" />}>
                        <Option value="month">월 구독료</Option>
                        <Option value="quarter">분기 구독료</Option>
                        <Option value="halfYear">반년 구독료</Option>
                        <Option value="year">년 구독료</Option>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="col-sm-2 padding-zero align-self-center">
                  <div className="row">
                    <div className="col-5 serviceName text-left padding-zero">
                      가격
                    </div>
                    {/* 카테고리*/}
                    <div className="col service-sub-Name text-left padding-zero">
                      <InputGroup compact>
                        <Input id="price" className="text-left" style={{ width: '70%' }} defaultValue={inputData.price} placeholder="0"
                          onChange={this.handleChange} />
                        <Select defaultValue="won" style={{ width: '30%' }} className="select-box text-right"
                          suffixIcon={<Icon type="caret-down" />}>
                          <Option value="won">원</Option>
                          <Option value="dollar">달러</Option>
                          <Option value="euro">유로</Option>
                        </Select>
                      </InputGroup>
                    </div>
                  </div>
                </div>

                <div className="col-sm-2 padding-zero align-self-center">
                  <div className="row">
                    <div className="col-5 serviceName text-left padding-zero">
                      결제일
                    </div>
                    {/* 카테고리*/}
                    <div className="col service-sub-Name text-left padding-zero">
                      <DatePickers date={this.state.dateObject.date} onDatePickerChange={this.onDatePickerChange} />
                    </div>
                  </div>
                </div>

                <div className="col-sm-2 padding-zero align-self-center">
                  <div className="row">
                    <div className="col-5 serviceName text-left padding-zero">
                      결제방식
                    </div>
                    {/* 카테고리*/}
                    <div className="col service-sub-Name text-left padding-zero">
                      <Select defaultValue={info.channel} className="select-box"
                        id="channel"
                        suffixIcon={<Icon type="caret-down" />}
                        onChange={this.channelHandleChange}>
                        <Option value="in-app">App</Option>
                        <Option value="site">Web</Option>
                      </Select>
                    </div>
                  </div>
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
