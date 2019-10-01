import React, {Component} from 'react';

import Netflix from '../../../resources/static/img/templogo/netflix.png';
import Tving from '../../../resources/static/img/templogo/tving.png';
import Watcha from '../../../resources/static/img/templogo/watcha.png';
import Melon from '../../../resources/static/img/templogo/melon.png';
import Flo from '../../../resources/static/img/templogo/Flo.png';
import Bugs from '../../../resources/static/img/templogo/Bugs.png';
import NaverCloud from '../../../resources/static/img/templogo/NaverCloud.png';
import Screen from '../../../resources/static/img/templogo/Screen.png';

import './recommend.css';

class Recommend extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">

            {/* 구독중인 서비스 list */}
            <div className="col-md-6">
              <h2>Recommend App</h2>
              <div className='recommend'>
                <div className="col-5">
                  <h4>VOD</h4>
                </div>
                <div style={{'margin': '0', 'color': 'cornflowerblue', 'textAlign': 'right'}}>
                    더보기
                </div>
                <div className="container w-100 p-3" id="inner-element">
                  <div className="row">
                    <div className="col-2" style={{margin: 'auto'}}>
                      <h5>No 1.</h5>
                    </div>
                    <div className="col-2">
                      <img src={Netflix} alt="test" style={{height: '5vh', borderRadius: '5px'}}/>
                    </div>
                    <div className="col-3" style={{margin: 'auto'}}>
                        Netflix
                    </div>
                    <div className="col">
                      <div className="row">
                        <h5>$9.9 / Month</h5>
                      </div>
                      <div className="row" style={{color: 'orange'}}>
                          ★ ★ ★ ★ ☆
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container w-100 p-3" id="inner-element">
                  <div className="row">
                    <div className="col-2" style={{margin: 'auto'}}>
                      <h5>No 2.</h5>
                    </div>
                    <div className="col-2">
                      <img src={Watcha} alt="test" style={{height: '5vh', borderRadius: '5px'}}/>
                    </div>
                    <div className="col-3" style={{margin: 'auto'}}>
                        Watcha Paly
                    </div>
                    <div className="col">
                      <div className="row">
                        <h5>$6.7 / Month</h5>
                      </div>
                      <div className="row" style={{color: 'orange'}}>
                          ★ ★ ★ ☆ ☆
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container w-100 p-3" id="inner-element">
                  <div className="row">
                    <div className="col-2" style={{margin: 'auto'}}>
                      <h5>No 3.</h5>
                    </div>
                    <div className="col-2">
                      <img src={Tving} alt="test" style={{height: '5vh', borderRadius: '5px'}}/>
                    </div>
                    <div className="col-3" style={{margin: 'auto'}}>
                        TVING
                    </div>
                    <div className="col">
                      <div className="row">
                        <h5>$15 / Month</h5>
                      </div>
                      <div className="row" style={{color: 'orange'}}>
                          ★ ★ ☆ ☆ ☆
                      </div>
                    </div>
                  </div>
                </div>


              </div>
              <hr/>
              <div className='recommend'>

                <div className="col-5">
                  <h4>Music</h4>
                </div>
                <div style={{'margin': '0', 'color': 'cornflowerblue', 'textAlign': 'right'}}>
                    더보기
                </div>
                <div className="container w-100 p-3" id="inner-element">
                  <div className="row">
                    <div className="col-2" style={{margin: 'auto'}}>
                      <h5>No 1.</h5>
                    </div>
                    <div className="col-2">
                      <img src={Melon} alt="test" style={{height: '5vh', borderRadius: '5px'}}/>
                    </div>
                    <div className="col-3" style={{margin: 'auto'}}>
                        Melon
                    </div>
                    <div className="col">
                      <div className="row">
                        <h5>₩7,900 / Month</h5>
                      </div>
                      <div className="row" style={{color: 'orange'}}>
                          ★ ★ ★ ★ ☆
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container w-100 p-3" id="inner-element">
                  <div className="row">
                    <div className="col-2" style={{margin: 'auto'}}>
                      <h5>No 2.</h5>
                    </div>
                    <div className="col-2">
                      <img src={Flo} alt="test" style={{height: '5vh', borderRadius: '5px'}}/>
                    </div>
                    <div className="col-3" style={{margin: 'auto'}}>
                        Flo
                    </div>
                    <div className="col">
                      <div className="row">
                        <h5>₩7,000 / Month</h5>
                      </div>
                      <div className="row" style={{color: 'orange'}}>
                          ★ ★ ★ ☆ ☆
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container w-100 p-3" id="inner-element">
                  <div className="row">
                    <div className="col-2" style={{margin: 'auto'}}>
                      <h5>No 3.</h5>
                    </div>
                    <div className="col-2">
                      <img src={Bugs} alt="test" style={{height: '5vh', borderRadius: '5px'}}/>
                    </div>
                    <div className="col-3" style={{margin: 'auto'}}>
                        Bugs
                    </div>
                    <div className="col">
                      <div className="row">
                        <h5>₩7,900 / Month</h5>
                      </div>
                      <div className="row" style={{color: 'orange'}}>
                          ★ ★ ☆ ☆ ☆
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>

            <div className="col-md-6">
              <h2>Similarly used App</h2>
              <div className='simillyUsed'>

                <div className="container w-100 p-3" id="inner-element">
                  <div className="row">
                    <div className="col-2">
                      <img src={NaverCloud} alt="test" style={{height: '5vh', borderRadius: '5px'}}/>
                    </div>
                    <div className="col-3" style={{margin: 'auto'}}>
                        NaverCloud
                    </div>
                    <div className="col">
                      <div className="row">
                        <h5>$9.9 / Month</h5>
                      </div>
                      <div className="row" style={{color: 'orange'}}>
                          ★ ★ ★ ★ ☆
                      </div>
                    </div>
                  </div>
                </div>
                <img src={Screen} />

                <div style={{'margin': '0', 'color': 'cornflowerblue', 'textAlign': 'right'}}>
                    접기
                </div>
                <hr/>

                <div className="container w-100 p-3" id="inner-element">
                  <div className="row">
                    <div className="col-2">
                      <img src={Watcha} alt="test" style={{height: '5vh', borderRadius: '5px'}}/>
                    </div>
                    <div className="col-3" style={{margin: 'auto'}}>
                        Watcha Play
                    </div>
                    <div className="col">
                      <div className="row">
                        <h5>$9.9 / Month</h5>
                      </div>
                      <div className="row" style={{color: 'orange'}}>
                          ★ ★ ★ ★ ☆
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{'margin': '0', 'color': 'cornflowerblue', 'textAlign': 'right'}}>
                    더보기
                </div>
                <hr/>

                <div className="container w-100 p-3" id="inner-element">
                  <div className="row">
                    <div className="col-2">
                      <img src={Tving} alt="test" style={{height: '5vh', borderRadius: '5px'}}/>
                    </div>
                    <div className="col-3" style={{margin: 'auto'}}>
                        TVING
                    </div>
                    <div className="col">
                      <div className="row">
                        <h5>$9.9 / Month</h5>
                      </div>
                      <div className="row" style={{color: 'orange'}}>
                          ★ ★ ★ ★ ☆
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{'margin': '0', 'color': 'cornflowerblue', 'textAlign': 'right'}}>
                    더보기
                </div>
                <hr/>

              </div>

            </div>

          </div>

        </div>
      </>
    );
  }
}

export default Recommend;
