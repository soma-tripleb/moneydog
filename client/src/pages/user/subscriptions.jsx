import React, { Component } from 'react';
import update from 'react-addons-update';

import SubsApp from './subsApp';
import '../../static/style/page/subscriptions.css';

class Subscriptions extends Component {
  state = {
    arr: [
      { logo: 'logo1', name: 'name1', label: '+' },
      { logo: 'logo2', name: 'name2', label: '+' },
      { logo: 'logo3', name: 'name3', label: '+' },
      { logo: 'logo4', name: 'name4', label: '+' },
      { logo: 'logo5', name: 'name5', label: '+' },
      { logo: 'logo6', name: 'name6', label: '+' },
      { logo: 'logo7', name: 'name7', label: '+' },
      { logo: 'logo8', name: 'name8', label: '+' },
      { logo: 'logo9', name: 'name9', label: '+' },
      { logo: 'logo10', name: 'name10', label: '+' },
    ],
    arr2: [],
  }

  insertContact = (number, logo, name) => {
    const newState = update(this.state, {
        arr2: {
            $push: [
              { 'logo': logo, 'name': name, 'label': '-' }
            ]
        },
    });

    this.setState(newState);
  }

  render() {
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
                    logo: content.logo,
                    name: content.name,
                    label: content.label,
                    number: i,
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
                    logo: content.logo,
                    name: content.name,
                    label: content.label,
                    number: i,
                  }
                }/>
              )
            })}
          </div>
        </div>
        </>
    );
  }
}

export default Subscriptions;