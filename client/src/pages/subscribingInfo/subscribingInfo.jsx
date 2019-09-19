import React, { Component } from 'react';
import update from 'react-addons-update';
import { connect as ReduxConn } from 'react-redux';

import Cookies from 'js-cookie';

import SubsTmpl from './subsTmpl';
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

const UserInputTemplate = {
  seq: '',
  logo: '',
  name: '',
  price: '',
  paymentDate: '',
  channel: '',
};

class SubscribingInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userSubsList: [],
      userInputList: [],
      substmpl: [
        {
          name: 'Bugs',
          price: '',
          paymentDate: '',
          channel: '',
        },
        {
          name: 'Flo',
          price: '',
          paymentDate: '',
          channel: '',
        },
        {
          name: 'Melon',
          price: '',
          paymentDate: '',
          channel: '',
        }
      ],
    };
  }

  componentDidMount = () => {
    const userList = this.props.USERS.subsTmplList;
    this.getUserSubsList(userList);
  }

  getUserSubsList = (list) => {
    const userSelectedSubscriptionList = list;

    const subsList = (this.props.USERS.subsTmplList.length === 0) ?TEST_SUBS : this.props.USERS.subsTmplList;

    const tempList = [];
    if (this.props.USERS.subsTmplList.length === 0) {

    } else {
      list.map((Subscription) => {
        tempList.push({
          seq: Subscription.seq,
          logo: Subscription.logo,
          name: Subscription.name,
          price: '',
          paymentDate: '',
          channel: '',
        });
      });
    }

    console.log(tempList);

    this.setState({
      userSubsList: update(this.state.userSubsList, {$push: subsList}),
      userInputList: update(this.state.userInputList, {$push: tempList})
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { substmpl } = this.state;

    substmpl.some((info) => {
      if (info.price === '') {
        alert('결제금액을 입력해주세요');
        return true;
      } else {
      }
    });
    // service.updateUserSubsInfo(this.state.userInputList);
    console.log(this.state.substmpl);
  }

  handleUserInputChange = (name, element, userInput) => {
    const {substmpl} = this.state;

    this.setState({
      substmpl: substmpl.map((info) => {
        if (info.name === name) {
          switch (element) {
            case 'price':
              return ({ ...info, price: userInput });
              break;
            case 'paymentDate':
              return ({...info, paymentDate: userInput});
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
    const list = this.state.userInputList.map(
      (content, i) => (
        <SubsTmpl
          key={i}
          info={
            {
              index: i,
              name: content.name,
            }
          }
          inputData={this.state.userInputList[i]}
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
            <form onSubmit={this.handleSubmit}>
              {this.InputSubscriptionTemplateInfo()}
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  USERS: state.users,
});

export default ReduxConn(mapStateToProps)(SubscribingInfo);
