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
      userInputList: [],
      userSubsList: [],
    };
  };

  // LifeCycle  :: constructor -> componentWillMount -> render -> componentDidMount
  componentDidMount() {
    this.getUserTempSubsList();
    this.getUserSubsList();
  }

  // 제거 LifeCycle :: component 가 없어진다면 TempSubs를 모두 삭제 해준다.
  componentWillUnmount() {
    this.props.reduxDeleteTempSubscriptions();
  }

  // 유저가 선택한 list 를 price, paymentDate, channel 추가 해서 state 에 저장
  getUserTempSubsList = () => {
    const userSeletedList = this.props.USERS.tempSubscriptions;
    const tempInputList = [];

    if (userSeletedList.length !== 0) {
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
      userInputList: update(this.state.userInputList, { $push: tempInputList })
    });
  };

  // 이미 구독한 정보를 state에 저장
  getUserSubsList = () =>{
    const userSubsList = this.props.USERS.subscriptions;

    this.setState({
      userSubsList: update(this.state.userInputList, { $push: userSubsList })
    });
  };

  // 이전 버튼 :: 구독 관리 페이지로 넘어간다.
  previousHandleSubmit = (e) =>{
    e.preventDefault();

    this.props.history.push('/user/subscribing');
  };

  // 완료버튼 :: 다음 버튼 정보가 모두 들어왔느지 확인 후 값을 수정 or 삭제 한다
  nextHandleSubmit = async (e) => {
    e.preventDefault();

    const { userInputList, userSubsList } = this.state;
    const { reduxInsertUserSubscriptions, reduxUpdateUserSubscriptions, history} = this.props;

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

    reduxUpdateUserSubscriptions(userSubsList);
    const updateResult = await SubsTmplService.updateUserSubsInfo(userSubsList);
    const result = await SubsTmplService.insertUserSubsInfo(userInputList);

    if (result.data.status === 200) {
      await reduxInsertUserSubscriptions(userInputList);
      history.push('/user/dashboard');
    } else {
      console.log(result);
      alert('ERROR'); // TODO
    }
  };

  handleUserSubsChange = (name, element, userInput) => {
    const inputList = this.state.userSubsList;

    this.setState({
      userSubsList: inputList.map((info) => {
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

  // 삭제 버튼 눌르면 사용자의 이미 구독된 정보 삭제
  deleteUserSubs = (serviceName) =>{
    const {userSubsList} = this.state;

    this.setState({
      userSubsList: userSubsList.filter((info) => info.name !== serviceName),
    });
  };

  // 삭제 버튼 눌르면 사용자가 추가 하려 했던 구독 정보 삭제
  deleteUserInputSubs = (serviceName) =>{
    const {userInputList} = this.state;

    this.setState({
      userInputList: userInputList.filter((info) => info.name !== serviceName),
    });
  };

  SubscriptionInfo = () => {
    const inputList = this.state.userSubsList;

    const list = inputList.map(
      (content, i) => (
        <SubsTmpl
          key={i}
          info={content}
          inputData={inputList[i]}
          DeleteSubs={this.deleteUserSubs}
          onUserInputChange={this.handleUserSubsChange}
        >
        </SubsTmpl>
      )
    );
    return list;
  };

  InputSubscriptionTemplateInfo = () => {
    const inputList = this.state.userInputList;

    const list = inputList.map(
      (content, i) => (
        <SubsTmpl
          key={i}
          info={content}
          inputData={inputList[i]}
          DeleteSubs={this.deleteUserInputSubs}
          onUserInputChange={this.handleUserInputChange}
        >
        </SubsTmpl>
      )
    );
    return list;
  };

  showSubsInputList = () =>{
    if (this.state.userInputList.length !== 0) {
      return (
        <>
          <div className="row">
            <div className="col subs-container-inner">
              <form className="w-100 p-3 user-info-container">
                <div className="subs-title">구독 추가 정보</div>
                {/*    <form className="w-100 p-3" id="user-info-container">*/}
                {this.InputSubscriptionTemplateInfo()}
                {/* </form>*/}
              </form>
            </div>
          </div>

        </>
      );
    }
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="col text-center">
            <span className="col subscription-step text-center">
            Step 2
            </span>
            <div className="col subscription-title text-center">
                세부 구독 정보
            </div>
          </div>

          <div className="col subs-container">

            <div className="row">
              <div className="col subs-container-inner">
                <form className="w-100 p-3 user-info-container">
                  <div className="subs-title">기존 구독 정보</div>
                  {this.SubscriptionInfo()}
                </form>
              </div>
            </div>
            {/* <div className="row">*/}
            {/*  <div className="col subs-container-inner">*/}
            {/*    <form className="w-100 p-3 user-info-container">*/}
            {this.showSubsInputList()}
            {/*    </form>*/}
            {/*  </div>*/}
            {/* </div>*/}

            <div className="row">
              <div className="col-sm btn-padding">
                <button onClick={this.nextHandleSubmit} type="button" className="btn btn-dark"> 완료 </button>
              </div>
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
    reduxUpdateUserSubscriptions: (userInputList) => {
      dispatch(userActions.updateUserSubscriptions(userInputList));
    },
    reduxDeleteTempSubscriptions: () => {
      dispatch(userActions.deleteTempSubscriptions());
    },
  };
};

export default ReduxConn(mapStateToProps, mapDispatchToProps)(SubscribingInfo);
