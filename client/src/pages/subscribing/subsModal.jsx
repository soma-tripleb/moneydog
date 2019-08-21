import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Calendar } from 'antd';

import './Calendar.css';

class SubsModal extends Component {
    state = {
        name: this.props.name,
        show: this.props.show,
    }

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
        const { SubsModalInfo } = this.props;

        return (
            <>
                <Modal
                    size="lg"
                    show={this.state.show}
                    onHide={this.handleClose}
                    aria-labelledby="example-modal-sizes-title-lg"
                    // key={SubsModalInfo.name}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            {/* {SubsModalInfo.name} */}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <p style={{ marginBottom: '5px' }}>이용권</p>
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
                            </div>

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

                                </div>
                                <div className="col-sm-5">
                                    <span>가격</span>
                                    <input type="text" placeholder="결제 금액" style={{ width: '100%' }} />
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
    }
}

export default SubsModal;