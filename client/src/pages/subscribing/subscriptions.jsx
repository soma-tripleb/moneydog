import React, {Component} from 'react';

import update from 'react-addons-update';

import {connect as ReduxConn} from 'react-redux';
import UserActions from '../../redux/actions/userAction';

import SubsApp from './subsApp';
import UserCustomSubscription from './userCustomSubscription';
import SubsTmplService from './subscriptions.ajax';
import UserSubsApp from './userSubsApp';

import './subscriptions.css';
import AuthActions from '../../redux/actions/authAction';


class Subscriptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staticSubscribeArr: [],
      SubscribingArr: [],
    };
  }

  // render 되기전 componentDidMount 로 subTemplate 가져오기
  componentDidMount() {
    this.ajaxGetSubTmtl();
  }

  // subTemplate 배열에 저장 하고 images 이름에 맞춰 같이 저장 하기
  ajaxGetSubTmtl = async () => {
    const { subscriptions } = this.props;

    const subsTmplResponse = await SubsTmplService.getList();

    if (subsTmplResponse.status === 403 ) {
      this.props.REDUX_AUTH_LOGOUT_REQUEST();
      alert('세션 만료 다시 로그인 해주세요');
      return;
    }


    const subsTmplList = subsTmplResponse.data.message;

    if (subscriptions.length !== 0) {
      subscriptions.map((subscription) => {
        const idx = subsTmplList.findIndex((item) => {
          return item.name.toLowerCase() === subscription.name.toLowerCase();
        });
        if (idx > -1) subsTmplList.splice(idx, 1);
      });
    }

    this.setState({
      staticSubscribeArr: subsTmplList,
    });
  };

  // staticSubscribeArr 에서 SubscribingArr 로 옮기기
  insertContact = (seq, logoURI, name) => {
    let flag = false;
    this.state.SubscribingArr.map((content) =>{
      if (content.seq === seq) flag = true;
    });
    if (flag) return;

    let newState;
    if (logoURI === '') {
      newState = update(this.state, {
        SubscribingArr: {
          $push: [
            {
              'seq': seq,
              'logoURI': logoURI,
              'name': name,
              'color': '#'+Math.round(Math.random() * 0xffffff).toString(16),
            },
          ],
        },
      });
    } else {
      newState = update(this.state, {
        SubscribingArr: {
          $push: [
            {
              'seq': seq,
              'logoURI': logoURI,
              'name': name,
            },
          ],
        },
      });
    }

    this.setState(newState);
  };

  // SubscribeArr 에서 지우기
  deleteContant = (number) => {
    const {SubscribingArr} = this.state;
    this.setState({
      SubscribingArr: SubscribingArr.filter((info) => info.seq !== number),
    });
  };

  // 제출 버튼
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.REDUX_USER_SET_SUBSTMPL_LIST(this.state.SubscribingArr);
    this.props.history.push('/user/subscribing-info');
  };

  makeStaticSubscribeApp = () => {
    const list = this.state.staticSubscribeArr.map(
      (content, i) => (
        <SubsApp
          key={i + content.name}
          onInsert={this.insertContact.bind(this)}
          subsAppInfo={
            {
              seq: content.seq,
              logoURI: content.logoURI,
              name: content.name,
              label: '+',
            }
          } />
      )
    );
    return list;
  };

  makeSubscribingApp = () => {
    const list = this.state.SubscribingArr.map(
      (content, i) => (
        <SubsApp key={i+content.name} onDelete={this.deleteContant.bind(this)} subsAppInfo={
          {
            seq: content.seq,
            logoURI: content.logoURI,
            name: content.name,
            color: content.color,
            label: '-',
          }
        }/>
      )
    );
    return list;
  };

  render() {
    return (
      <>
        <div className="container main-container">
          <div className="col text-center">
            <span className="col subscription-step text-center">
            Step 1
            </span>
            <div className="col subscription-title text-center">
              구독중 서비스
            </div>
          </div>

          <div className="col subs-container">
            <div className="row ">

              <div className="col-sm subs-container-inner">
                <div className="col" id="inner-container">
                  <div className="subs-title">주요 구독 서비스</div>
                  {this.makeStaticSubscribeApp()}
                  <div className="subs-title">직접 추가 입력</div>
                  <UserCustomSubscription onInsert={this.insertContact.bind(this)}/>
                </div>
              </div>

              <div className="col-sm-1 subs-container-inner align-self-center">
              asd
              </div>

              <div className="col-sm subs-container-inner">
                <div className="col" id="inner-container">
                  <div className="subs-title">현재 구독중인 서비스</div>
                  {this.makeSubscribingApp()}
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-sm btn-padding">
                <button onClick={this.handleSubmit} type="button" className="btn btn-dark"> 다음 </button>
              </div>
            </div>

          </div>


        </div>

        <div className="container subscription-title">
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  subscriptions: state.users.subscriptions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    REDUX_USER_SET_SUBSTMPL_LIST: (list) => {
      dispatch(UserActions.setUserSubsTmplList(list));
    },
    REDUX_AUTH_LOGOUT_REQUEST: () => {
      dispatch(AuthActions.logoutRequest());
    },
  };
};

export default ReduxConn(mapStateToProps, mapDispatchToProps)(Subscriptions);

