import React, { Component } from 'react';
import update from 'react-addons-update';
import { connect as ReduxConn } from 'react-redux';
import DateUtil from '../../../src/pages/util/dateUtil';

import Cookies from 'js-cookie';

import SubsTmpl from './subsTmpl';
import SubsTmplService from './subscribingInfo.ajax';

import { TEST_USER_SELECTED_SUBS, TEST_USER_SUBSTMPL_INFO_LIST } from './sample/userSubsDatas';

import './subscribingInfo.css';

const NOW = DateUtil.NOW();

const mapStateToProps = (state) => ({
  USERS: state.users,
});

class SubscribingInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userSubsList: [],
      userInputList: [],
    };
  }

  componentDidMount = () => {
    const userSeletedList = this.props.USERS.subsTmplList;
    const userSelectedListLength = this.props.USERS.subsTmplList.length;

    this.getUserSubsList(userSeletedList, userSelectedListLength);
  }

  getUserSubsList = (userSeletedList, userSelectedListLength) => {
    let tempSubsList = [];
    let tempInputList = [];

    // TEST
    if (userSelectedListLength === 0) {
      tempSubsList = TEST_USER_SELECTED_SUBS;
      tempInputList = TEST_USER_SUBSTMPL_INFO_LIST;
    } else {
      tempSubsList = userSeletedList;

      userSeletedList.map((Subscription) => {
        tempInputList.push({
          seq: Subscription.seq,
          logo: Subscription.logo,
          name: Subscription.name,
          price: '',
          paymentDate: `${NOW}`,
          channel: 'inapp',
        });
      });
    }

    this.setState({
      userSubsList: update(this.state.userSubsList, { $push: tempSubsList }),
      userInputList: update(this.state.userInputList, { $push: tempInputList })
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { userInputList } = this.state;
    const userToken = Cookies.getJSON('auth').status.JWT;

    userInputList.some((info) => {
      if (info.price === '') {
        alert('결제금액을 입력해주세요');
        return true;
      } ;

      if (info.paymentDate === '') {
        alert('결제일을 입력해주세요');
        return true;
      }

      if (info.channel === '') {
        alert('결제 체널을 체크해주세요');
        return true;
      }
    });

    console.log('SUBSCRIPTION: ', userInputList);

    // SubsTmplService.updateUserSubsInfo(userToken, userInputList);
  }

  handleUserInputChange = (name, element, userInput) => {
    console.log('SUBSCRIBING: ', name);
    console.log('SUBSCRIBING: ', element);
    console.log('SUBSCRIBING: ', userInput);

    let inputList = '';

    // TEST
    if (this.state.userInputList.length === 0) {
      inputList = TEST_USER_SUBSTMPL_INFO_LIST;
    } else {
      inputList = this.state.userInputList;
    }

    this.setState({
      userInputList: inputList.map((info) => {
        if (info.name === name) {
          switch (element) {
            case 'price':
              return ({ ...info, price: userInput });
              break;
            case 'paymentDate':
              return ({ ...info, paymentDate: userInput });
              break;
            case 'channel':
              return ({ ...info, channel: userInput });
              break;
            default:
              return info;
          }
        } else {
          return info;
        }
      }),
    });
  }

  InputSubscriptionTemplateInfo = () => {
    const inputList = this.state.userInputList;

    const list = inputList.map(
      (content, i) => (
        <SubsTmpl
          key={i}
          info={content}
          inputData={inputList[i]}
          onUserInputChange={this.handleUserInputChange}
        >
        </SubsTmpl>
      )
    );
    return list;
  };

  render() {
    return (
      <>
        <div className="container">
          <p>사용자 구독 서비스 정보 등록</p>
          <div className="row">
            <div className="col">
              <form onSubmit={this.handleSubmit}>
                {this.InputSubscriptionTemplateInfo()}
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ReduxConn(mapStateToProps)(SubscribingInfo);
