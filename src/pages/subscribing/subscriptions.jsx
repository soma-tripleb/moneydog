import React, {Component} from 'react';

import update from 'react-addons-update';

import {connect as ReduxConn} from 'react-redux';
import UserActions from '../../redux/actions/userAction';

import SubsApp from './subsApp';
import SubsTmplService from './subscriptions.ajax';

import * as images from '../../../resources/static/img/templogo';

import './subscriptions.css';

const mapStateToProps = (state) => ({
  subscriptions: state.users.subscriptions,
});

class Subscriptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staticSubscribeArr: [],
      SubscribingArr: [],
      show: false,
      setShow: false,
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
    const subsTmplList = subsTmplResponse.data.message;

    if (subscriptions.length !== 0) {
      subscriptions.map((subscription) => {
        const idx = subsTmplList.findIndex((item) => {
          return item.name.toLowerCase() === subscription.name.toLowerCase();
        });
        if (idx > -1) subsTmplList.splice(idx, 1);
      });
    }

    // logo 필드 추가
    subsTmplList.map((subsTmpl) => {
      const subsTmplName = subsTmpl.thumbnail.toLowerCase();
      subsTmpl.logo = images[subsTmplName];
    });

    this.setState({
      staticSubscribeArr: subsTmplList,
    });
  };

  // staticSubscribeArr 에서 SubscribingArr 로 옮기기
  insertContact = (seq, logo, name) => {
    let flag = false;
    this.state.SubscribingArr.map((content) =>{
      if (content.seq === seq) flag = true;
    });

    if (flag) return;

    const newState = update(this.state, {
      SubscribingArr: {
        $push: [
          {
            'seq': seq,
            'logo': logo,
            'name': name,
          },
        ],
      },
    });
    this.setState(newState);
  };

  // staticSubscribeArr 에서 지우기
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
              logo: content.logo,
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
            logo: content.logo,
            name: content.name,
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
          <div className="row">
              Step 1. 구독중인 서비스를 추가 하세요
          </div>

          <div className="row">
            <div className="col-sm">

              <div className="w-100" id="inner-container">
                <p><u>Selecting App</u></p>
                {this.makeStaticSubscribeApp()}
              </div>
            </div>
            <div className="col-sm">

              <div className="w-100" id="inner-container">
                <p><u>Selected App</u></p>
                {this.makeSubscribingApp()}
              </div>
            </div>
          </div>
        </div>

        <div className="container submit-container">
          <div className="row">
            <div className="col-sm">
              <form onSubmit={this.handleSubmit}>
                <input type="submit" value="NEXT"/>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    REDUX_USER_SET_SUBSTMPL_LIST: (list) => {
      dispatch(UserActions.getUserSubsTmplList(list));
    },
  };
};

export default ReduxConn(mapStateToProps, mapDispatchToProps)(Subscriptions);

