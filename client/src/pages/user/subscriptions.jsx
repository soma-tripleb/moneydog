import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import update from 'react-addons-update';

import SubsApp from './subsApp';

import './subscriptions.css';

class Subscriptions extends Component {
  state = {
    arr: [
      { number: '', logo: 'https://s20352.pcdn.co/wp-content/uploads/2018/03/2000px-YouTube_social_white_square_2017.svg_-1-1024x778.png', name: 'YouTube', label: '+' },
      { number: '', logo: 'https://yt3.ggpht.com/a/AGF-l7--j4Ugc8V4M2wuVIak47WyqND4toWQepXr_Q=s900-c-k-c0xffffffff-no-rj-mo', name: 'Netflix', label: '+' },
      { number: '', logo: 'https://cdnimg.melon.co.kr/resource/mobile40/cds/common/image/mobile_apple_180x180.png', name: 'Melon', label: '+' },
      { number: '', logo: 'https://static.wanted.co.kr/images/wdes/0_4.ea590aaf.png', name: 'Watchar', label: '+' },
      { number: '', logo: 'https://tr4.cbsistatic.com/hub/i/r/2017/02/03/2a9700a9-f22a-48e4-a9a9-3148aa21009a/resize/1200x/5fda319b9ab0d2b09d696f3b8aab0089/icloud-logo.jpg', name: 'iCloud', label: '+' },
      { number: '', logo: 'https://www.apple.com/v/apple-music/j/images/shared/og_image.png', name: 'Apple Music', label: '+' },
      { number: '', logo: 'https://sites.google.com/a/bhuhsd.net/jessica-rapetti-u-s-government-economics-eportfolio-bhhs2014/_/rsrc/1421979558598/s6-unit-2-the-goals-and-the-origins-of-our-government-1/home/google%20drive.png?height=200&width=200', name: 'Google Drive', label: '+' },
      { number: '', logo: 'https://www.fieber.nl/wp-content/uploads/2015/07/Office-365-Business-Premium.jpg', name: 'Office 365', label: '+' },
      { number: '', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUM4jo_1bFr9yd-6cRgUI03mj3txWSJRbxO9Y4jG7P59-24eAE', name: 'RIDIBOOKS', label: '+' },
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
  }

  deleteContant = (number) => {
    const { arr2 } = this.state;
    this.setState({
      arr2: arr2.filter(info => info.number != number)
    })
  }

  handleClose = () => {
    this.setState({
      show: false,
    })
  }

  handleShow = (appInfo) => {

    console.log(appInfo.name);
    console.log(appInfo.logo);
    console.log(appInfo.number);

    this.setState({
      show: true,
    })
  }

  render() {
    const { show } = this.state;

    return (
      <>
        <div className="container">
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

                        <Modal key={content.name} show={show} onHide={this.handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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
      </>
    );
  }
}

export default Subscriptions;