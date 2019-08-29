import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Calendar, AutoComplete } from 'antd';

import update from 'react-addons-update';

import SubsApp from './subsApp';

import './subscriptions.css';
import './Calendar.css';

class Subscriptions extends Component {
  constructor(props) {
    super(props);

    this.styleDiv = React.createRef();
  }

  state = {
    arr: [
      { number: '', logo: 'https://www.tubefilter.com/wp-content/uploads/2018/03/youtube-picture-in-picture.jpg', name: 'YouTube', label: '+' },
      { number: '', logo: 'https://yt3.ggpht.com/a/AGF-l7--j4Ugc8V4M2wuVIak47WyqND4toWQepXr_Q=s900-c-k-c0xffffffff-no-rj-mo', name: 'Netflix', label: '+' },
      { number: '', logo: 'https://cdnimg.melon.co.kr/resource/mobile40/cds/common/image/mobile_apple_180x180.png', name: 'Melon', label: '+' },
      { number: '', logo: 'https://static.wanted.co.kr/images/wdes/0_4.ea590aaf.png', name: 'Watchar', label: '+' },
      { number: '', logo: 'https://tr4.cbsistatic.com/hub/i/r/2017/02/03/2a9700a9-f22a-48e4-a9a9-3148aa21009a/resize/1200x/5fda319b9ab0d2b09d696f3b8aab0089/icloud-logo.jpg', name: 'iCloud', label: '+' },
      { number: '', logo: 'https://www.apple.com/v/apple-music/j/images/shared/og_image.png', name: 'Apple Music', label: '+' },
      { number: '', logo: 'https://sites.google.com/a/bhuhsd.net/jessica-rapetti-u-s-government-economics-eportfolio-bhhs2014/_/rsrc/1421979558598/s6-unit-2-the-goals-and-the-origins-of-our-government-1/home/google%20drive.png?height=200&width=200', name: 'Google Drive', label: '+' },
      { number: '', logo: 'https://www.fieber.nl/wp-content/uploads/2015/07/Office-365-Business-Premium.jpg', name: 'Office 365', label: '+' },
      { number: '', logo: 'https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/71/b3/0f/71b30f06-c3f3-13dc-7ad7-d99fae29f0c5/source/512x512bb.jpg', name: 'Tving', label: '+' },
      { number: '', logo: 'https://music-phinf.pstatic.net/20180625_230/1529912520094UdxG8_PNG/vibe_sns_1200X1200.png?type=w726', name: 'Vibe', label: '+' },
    ],
    arr2: [],
    show: false,
    setShow: false,
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
  };

  deleteContant = (number) => {
    const { arr2 } = this.state;
    this.setState({
      arr2: arr2.filter(info => info.number != number)
    })
  };

  handleClose = () => {
    this.setState({
      show: false,
    })
  }

  handleShow = (appInfo) => {

    this.setState({
      show: true,
    })
  }

  render() {
    const { show } = this.state;

    return (
      <>
        <div className="container main-container">
          <div className="row">

            <div className="col-sm">
              <p id="inner-container-title">&lt;  구독 서비스 앱들  &gt;</p>

              <div className="w-100 p-3" id="inner-container">
                <p><u>Selecting App</u></p>

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
            </div>

            <div className="col-sm">
              <p id="inner-container-title">&lt;  구독 중인 앱들  &gt;</p>

              <div className="w-100 p-3" id="inner-container">
                <p><u>Selected App</u></p>
                {this.state.arr2.map(
                  (content, i) => {
                    return (
                      <>
                        <div onClick={this.handleShow}>
                          <SubsApp key={i} onDelete={this.deleteContant.bind(this)} subsAppInfo={
                            {
                              number: content.number,
                              logo: content.logo,
                              name: content.name,
                              label: '-',
                            }
                          } />
                        </div>

                        <Modal
                          size="lg"
                          show={show}
                          onHide={this.handleClose}
                          aria-labelledby="example-modal-sizes-title-lg"
                          key={content.name}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                              {content.name}
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="container">
                              {/* <p style={{ marginBottom: '5px' }}>이용권</p>
                              <div className="row" style={{ margin: 'auto', textAlign: 'center', border: '1px solid black', borderRadius: '5px', padding: '10px' }}>

                                <div className="input-group">
                                  <div className="input-group-prepend" id="button-addon3">
                                    <div className="col-sm">
                                      <button className="btn" type="button" style={{ border: '1px solid black', witdh: '100%' }}>
                                        <p>A</p>
                                        <p>₩12,000</p>
                                      </button>
                                    </div>
                                    <div className="col-sm">
                                      <button className="btn" type="button" style={{ border: '1px solid black', witdh: '100%' }}>
                                        <p>A</p>
                                        <p>₩12,000</p>
                                      </button>
                                    </div>
                                    <div className="col-sm">
                                      <button className="btn" type="button" style={{ border: '1px solid black', witdh: '100%' }}>
                                        <p>A</p>
                                        <p>₩12,000</p>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                              {/* <div className="row" style={{margin: 'auto', height: '100px', textAlign: 'center', marginBottom: '20px' }}>
                                <div className="col-sm" style={{ borderRadius: '10px', border: '1px solid gray', marginLeft: '5px', marginRight: '5px', backgroundColor: {priceDivBgc} }} ref={this.styleDiv} onClick={this.handleColorChange.bind(this)}>
                                  <p>A</p>
                                  <p>₩12,000</p>
                                </div>
                                <button className="col-sm" style={this.state.btnStyle} onClick={() => {
                                  Object.assign(this.state.btnStyle, {'backgroundColor': 'black'});
                                }}>
                                  <p>A</p>
                                  <p>₩12,000</p>
                                </button>
                                <div className="col-sm" style={{ borderRadius: '10px', border: '1px solid gray', marginLeft: '5px', marginRight: '5px' }}>
                                  <p>A</p>
                                  <p>₩12,000</p>
                                </div> 
                              </div> */}

                              <hr />

                              <p style={{ marginBottom: '5px' }}>option2</p>
                              <div className="row" style={{ border: '1px solid black', borderRadius: '5px', margin: 'auto', padding: '10px' }}>
                                <div className="col-sm-5">
                                  <span>개월</span>
                                  <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle col-sm-5" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      개월 선택
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                      <a className="dropdown-item" href="#">1개월</a>
                                      <a className="dropdown-item" href="#">2개월</a>
                                      <a className="dropdown-item" href="#">3개월</a>
                                      <a className="dropdown-item" href="#">4개월</a>
                                      <a className="dropdown-item" href="#">5개월</a>
                                      <a className="dropdown-item" href="#">6개월</a>
                                      <a className="dropdown-item" href="#">7개월</a>
                                      <a className="dropdown-item" href="#">8개월</a>
                                      <a className="dropdown-item" href="#">9개월</a>
                                      <a className="dropdown-item" href="#">10개월</a>
                                      <a className="dropdown-item" href="#">11개월</a>
                                      <a className="dropdown-item" href="#">12개월</a>
                                    </div>
                                  </div>
                                  {/* <input type="text" placeholder="정기결제 개월 수" style={{width: '100%'}}/> */}
                                  {/* <div className="col-sm" style={{borderRadius: '10px', border: '1px solid gray', marginLeft: '5px', marginRight: '5px'}}>
                                  </div> */}
                                </div>
                                <div className="col-sm-5">
                                  <span>가격</span>
                                  <input type="text" placeholder="결제 금액" style={{ width: '100%' }} />
                                  {/* <div className="col-sm" style={{borderRadius: '10px', border: '1px solid gray', marginLeft: '5px', marginRight: '5px'}}>
                                  <p>A</p>
                                  <p>₩12,000</p>
                                </div> */}
                                </div>
                                <div className="col-sm-2" style={{ textAlign: 'center', margin: 'auto' }}>
                                  <Button>입력</Button>
                                </div>
                              </div>

                              <hr />

                              <p>결제일</p>
                              <div className="row" style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <div className="col">
                                  <Calendar fullscreen={false}
                                    onPanelChange={this.onPanelChange}
                                    dateCellRender={this.dateCellRender}
                                    monthCellRender={this.monthCellRender}
                                  />
                                </div>
                              </div>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                              Close
                            </Button>
                            <Button variant="primary" onClick={this.handleClose}>
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
                    )
                  })}
              </div>

            </div>
          </div>
        </div>

        <div className="container" style={{ textAlign: 'center' }}>
          <div className="row">
            <div className="col-sm"></div>
            <div className="col-sm">
              <div className="circle"><a href="/dashboard" role="button" style={{ color: 'black' }}>Done</a></div>
            </div>
            <div className="col-sm"></div>
          </div>
        </div>
      </>
    );
  }
}

export default Subscriptions;