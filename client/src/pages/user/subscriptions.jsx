<<<<<<< HEAD
import React, { Component } from 'react';
import update from 'react-addons-update';

import SubsApp from './subsApp';

import '../../static/style/page/subscriptions.css';

class Subscriptions extends Component {

  state = {
    logo: 'parent-logo',
    title: 'parent-title',
    arr: [0,1,2,3,4,5,6,7,8,9],
    arr2: [],
  }

  insertContact = () => {
    const newState = update(this.state, {
        arr2: {
            $push: [
              0
            ]
        }
    });

    this.setState(newState);
  }

  render() {
    const { logo, title, count } = this.state;

    return (
      <>
        <h1>Subscriptions</h1>
        <div className="subs-container">

          {/* 왼쪽 박스 */}
          <div className="subs-inner-left-container mh-100 d-inline-block">
            우리가 DB 에 저장해 놓은 구독 서비스 앱들

            <div className="w-100 p-3" id="subs-inner-left-element">
              <p>Selecting App</p>
            </div>

            {this.state.arr.map(
              (content, i) => {
              return (
                <SubsApp key={i} onInsert={this.insertContact.bind(this)} subsAppInfo={
                  {
                    logo: logo,
                    title: title,
                    number: content,
                  }
                }/>
              )
            })}
            
          </div>

          {/* 가운데 공간 */}
          <div className="subs-inner-center-container mh-100 d-inline-block">

          </div>

          {/* 오른쪽 박스 */}
          <div className="subs-inner-right-container mh-100 d-inline-block">
            이메일 파싱을 통해 얻어낸 구독 정보와 사용자가 선택한 구독 정보

            <div className="w-100 p-3" id="subs-inner-right-element">
              <p>Seleted App</p>
            </div>

            {this.state.arr2.map((content, i) => {
              return (
                <SubsApp key={i} subsAppInfo={
                  {
                    logo: logo,
                    title: title,
                    number: content,
                  }
                }/>
              )
            })}
            
          </div>

        </div>
=======
import React, { Component } from 'react'

class Subscriptions extends Component {
  render() {
    return (
      <>
        <h1>Subscriptions</h1>
>>>>>>> #52 App(Content) 부분 height 100% 적용
      </>
    );
  }
}

export default Subscriptions;