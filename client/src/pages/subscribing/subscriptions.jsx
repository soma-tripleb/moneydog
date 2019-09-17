import React, {Component} from 'react';
import update from 'react-addons-update';

import SubsApp from './subsApp';
import * as service from './subscriptions.ajax';
import * as image from '../../static/img/templogo';

import './subscriptions.css';

class Subscriptions extends Component {
  state = {
    staticSubscribeArr: [],
    SubscribingArr: [],
    show: false,
    setShow: false,
  };

  // render 되기전 componentDidMount 로 subTemplate 가져오기
  componentDidMount() {
    this.ajaxGetSubTmtl();
  }

  // subTemplate 배열에 저장 하고 image 이름에 맞춰 같이 저장 하기
  ajaxGetSubTmtl = async () => {
    const response = await service.getSubTmtl();

    this.setState({
      staticSubscribeArr: response.data.message,
    });

    this.state.staticSubscribeArr.map(
      (content) => {
        content.logo = image[content.thumbnail];
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

    // service.updateUserSubsInfo(this.state.arr2);
    window.location.assign('/subscribing-info');
  };

  makeStaticSubscribeApp = () => {
    const list = this.state.staticSubscribeArr.map(
      (content, i) => (<SubsApp key={i} onInsert={this.insertContact.bind(this)} subsAppInfo={
        {
          seq: content.seq,
          logo: content.logo,
          name: content.name,
          label: '+',
        }
      }/>)
    );
    return list;
  };

  makeSubscribingApp = () => {
    const list = this.state.SubscribingArr.map(
      (content, i) => (<SubsApp key={i} onDelete={this.deleteContant.bind(this)} subsAppInfo={
        {
          seq: content.seq,
          logo: content.logo,
          name: content.name,
          label: '-',
        }
      }/>)
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
                {/* <p id="inner-container-title">&lt;  구독 서비스 앱들  &gt;</p>*/}
                <div className="w-100 p-3" id="inner-container">
                  <p><u>Selecting App</u></p>
                  {this.makeStaticSubscribeApp()}
                </div>
              </div>
              <div className="col-sm">
                {/* <p id="inner-container-title">&lt;  구독 중인 앱들  &gt;</p>*/}
                <div className="w-100 p-3" id="inner-container">
                  <p><u>Selected App</u></p>
                  {this.makeSubscribingApp()}
                </div>
              </div>
            </div>
          </div>

          <div className="container submit-container">
            <div className="row">
              <div className="col-sm">
                {/* <div className="circle">*/}
                <form onSubmit={this.handleSubmit}>
                  <input type="submit" value="NEXT"/>
                </form>
                {/* </div>*/}
              </div>
            </div>
          </div>
        </>
    );
  }
}

export default Subscriptions;
