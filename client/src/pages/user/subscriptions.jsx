import React, { Component } from 'react';
import update from 'react-addons-update';

import SubsApp from './subsApp';
import '../../static/style/page/subscriptions.css';

class Subscriptions extends Component {
  state = {
    arr: [
      { number: '', logo: 'logo1', name: 'name1', label: '+' },
      { number: '', logo: 'logo2', name: 'name2', label: '+' },
      { number: '', logo: 'logo3', name: 'name3', label: '+' },
      { number: '', logo: 'logo4', name: 'name4', label: '+' },
      { number: '', logo: 'logo5', name: 'name5', label: '+' },
      { number: '', logo: 'logo6', name: 'name6', label: '+' },
      { number: '', logo: 'logo7', name: 'name7', label: '+' },
      { number: '', logo: 'logo8', name: 'name8', label: '+' },
      { number: '', logo: 'logo9', name: 'name9', label: '+' },
      { number: '', logo: 'logo10', name: 'name10', label: '+' },
    ],
    arr2: [],
  }

  insertContact = (number, logo, name) => {
    const newState = update(this.state, {
      arr2: {
        $push: [
          { 'number': number, 'logo': logo, 'name': name, 'label': '-' }
        ]
      },
    });

    this.setState(newState);
  }

  deleteContant = (number) => {
    const { arr2 } = this.state;
    this.setState({
      arr2: arr2.filter(info => info.number != number)
    })
  }

  render() {
    return (
      <>
        <h1>Subscriptions</h1>
        <div className="subs-container">

          <div className="h-20 d-inline-block" style={{width: '45%', textAlign: 'center'}}>
            <p style={{fontSize: '2rem', fontWeight: 'lighter', marginBottom: '3vh'}}>&lt; 구독 서비스 앱들 &gt;</p>
          </div>
          <div className="h-20 d-inline-block" style={{width: '10%'}}></div>
          <div className="h-20 d-inline-block" style={{width: '45%', textAlign: 'center'}}>
            <p>&lt; 구독 중인 앱들 &gt;</p>
          </div>
          
          {/* 왼쪽 박스 */}
          <div className="subs-inner-left-container mh-100 d-inline-block" style={{padding: '0 5px 5px 5px'}}>
            <div className="w-100 p-3" id="subs-inner-left-element" style={{borderRadius: 0, border: 0}}>
              <p style={{margin: 0}}><u>Selecting App</u></p>
            </div>

            {this.state.arr.map(
              (content, i) => {
                return (
                  <SubsApp key={i} onInsert={this.insertContact.bind(this)} subsAppInfo={
                    {
                      number: i,
                      logo: content.logo,
                      name: content.name,
                      label: content.label,
                    }
                  } />
                )
              })}

          </div>

          {/* 가운데 공간 */}
          <div className="subs-inner-center-container mh-100 d-inline-block">

          </div>

          {/* 오른쪽 박스 */}
          <div className="subs-inner-right-container mh-100 d-inline-block">

            <div className="w-100 p-3" id="subs-inner-right-element">
              <p>Seleted App</p>
            </div>

            {this.state.arr2.map((content, i) => {
              return (
                <SubsApp key={i} onDelete={this.deleteContant.bind(this)} subsAppInfo={
                  {
                    number: content.number,
                    logo: content.logo,
                    name: content.name,
                    label: '-',
                  }
                } />
              )
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Subscriptions;