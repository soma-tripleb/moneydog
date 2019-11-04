import React, { Component } from 'react';
import update from 'react-addons-update';
import { connect as ReduxConn } from 'react-redux';
import DateUtil from '../util/dateUtil';

import SubsTmpl from './subsTmpl';
import SubsTmplService from './subscribingInfo.ajax';

import { TEST_USER_SELECTED_SUBS, TEST_USER_SUBSTMPL_INFO_LIST } from './sample/userSubsDatas';

import './subscribingInfo.css';
import userActions from '../../redux/actions/userAction';

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

  componentDidMount() {
    const userSeletedList = this.props.USERS.tempSubscriptions;

    if (userSeletedList.length)
      this.getUserSubsList(userSeletedList);
  };

  componentWillUnmount() {
    this.props.reduxDeleteTempSubscriptions();
  };

  getUserSubsList = (userSeletedList) => {
    let tempSubsList = [];
    let tempInputList = [];
    const userSelectedListLength = userSeletedList.length;

    // TEST
    if (userSelectedListLength === 0) {
      tempSubsList = TEST_USER_SELECTED_SUBS;
      tempInputList = TEST_USER_SUBSTMPL_INFO_LIST;
    } else {
      tempSubsList = userSeletedList;

      userSeletedList.map((Subscription) => {
        tempInputList.push({
          ...Subscription,
          price: '',
          paymentDate: `${NOW}`,
          channel: '',
        });
      });
    }

    this.setState({
      userSubsList: update(this.state.userSubsList, { $push: tempSubsList }),
      userInputList: update(this.state.userInputList, { $push: tempInputList })
    });
  };

  previousHandleSubmit = (e) =>{
    console.log('test');
    e.preventDefault();

    this.props.history.push('/user/subscribing');
  };

  nextHandleSubmit = async (e) => {
    e.preventDefault();

    const { userInputList } = this.state;
    const { reduxInsertUserSubscriptions , history} = this.props;

    userInputList.some((info) => {
      if (info.price === '') {
        alert('결제금액을 입력해주세요');
        return true;
      }

      if (info.paymentDate === '') {
        alert('결제일을 입력해주세요');
        return true;
      }

      if (info.channel === '') {
        alert('결제 체널을 체크해주세요');
        return true;
      }
    });

    console.log(this.props.USERS.subscriptions);
    console.log(userInputList);
    const result = await SubsTmplService.updateUserSubsInfo(userInputList);

    if (result.data.status === 200) {
      await reduxInsertUserSubscriptions(userInputList);
      history.push('/user/dashboard');
    } else {
      console.log(result);
      alert('ERROR'); // TODO
    }
  };

  handleUserInputChange = (name, element, userInput) => {
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
            case 'paymentDate':
              return ({ ...info, paymentDate: userInput });
            case 'channel':
              return ({ ...info, channel: userInput });
            default:
              return info;
          }
        } else {
          return info;
        }
      }),
    });
  };

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
              <form className="w-100 p-3" id="user-info-container">
                {this.InputSubscriptionTemplateInfo()}
              </form>
            </div>
          </div>
        </div>

        <div className="container subscription-title">
          <div className="row">
            <div className="col-sm">
              <button onClick={this.previousHandleSubmit} type="button" className="btn btn-outline-dark"> 이전 </button>

              <button onClick={this.nextHandleSubmit} type="button" className="btn btn-outline-dark"> 다음 </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reduxInsertUserSubscriptions: (userInputList) => {
      dispatch(userActions.insertUserSubscriptions(userInputList));
    },
    reduxDeleteTempSubscriptions: () => {
      dispatch(userActions.deleteTempSubscriptions());
    },
  };
};

export default ReduxConn(mapStateToProps, mapDispatchToProps)(SubscribingInfo);
