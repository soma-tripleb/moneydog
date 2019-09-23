import React, { Component } from 'react';
import update from 'react-addons-update';
import { connect as ReduxConn } from 'react-redux';

import Cookies from 'js-cookie';

import SubsTmpl from './subsTmpl';
import SubsTmplService from './subscribingInfo.ajax';

import './subscribingInfo.css';

const TEST_SUBS = [
  {
    logo: undefined,
    name: 'Bugs',
    seq: 4,
  },
  {
    logo: '53034c07a6a95b5c4d8f1bdaa97383d9.png',
    name: 'Flo',
    seq: 5,
  },
  {
    logo: 'b5dd21c4668e2e0284ec5a1e4d9967ce.png',
    name: 'Melon',
    seq: 6,
  },
];

const TEST_SUBS_USER = [
  {
    seq: 4,
    name: 'Bugs',
    price: '',
    paymentDate: '',
    channel: '',
  },
  {
    seq: 5,
    name: 'Flo',
    price: '',
    paymentDate: '',
    channel: '',
  },
  {
    seq: 6,
    name: 'Melon',
    price: '',
    paymentDate: '',
    channel: '',
  }
];

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
      tempSubsList = TEST_SUBS;
      tempInputList = TEST_SUBS_USER;
    } else {
      tempSubsList = userSeletedList;

      userSeletedList.map((Subscription) => {
        tempInputList.push({
          seq: Subscription.seq,
          logo: Subscription.logo,
          name: Subscription.name,
          price: '',
          paymentDate: '',
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

    userInputList.map((info) => {
      if (info.price === '') {
        alert('결제금액을 입력해주세요');
        return false;
      } ;

      if (info.paymentDate === '') {
        alert('결제일을 입력해주세요');
        return false;
      }

      if (info.channel === '') {
        alert('결제 체널을 체크해주세요');
        return false;
      }
    });

    // SubsTmplService.updateUserSubsInfo(userToken, userInputList);
  }

  handleUserInputChange = (name, element, userInput, date) => {
    console.log('SUBSCRIBING: ', userInput);
    console.log('SUBSCRIBING: ', date);
    let inputList = '';

    // TEST
    if (this.state.userInputList.length === 0) {
      inputList = TEST_SUBS_USER;
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
