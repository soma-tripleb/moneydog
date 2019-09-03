import React, { Component } from 'react';

import * as service from './subscribingInfo.ajax';

import './subscribingInfo.css';

class SubscribingInfo extends Component {
    constructor(props) {
        super(props);

        this.getUserSubsList();

        this.state = {
            userSubsList: [],   // 사용자 데이터 받아오기
            userInputList: [],    // 사용자 데이터 전달하기
        }
    }

    getUserSubsList = async () => {
        const response = await service.getUserSubsInfo();
        const arrCnt = response.data.length;

        let subsInfoArr = [];

        for (let i = 0; i < arrCnt; i++) {
            let title = response.data[i].name;

            subsInfoArr.push(
                {
                    title: title,
                    payment: '',
                    price: '',
                    channel: '',
                }
            );
        }

        this.setState({
            userSubsList: response.data.slice(),
            userInputList: subsInfoArr.slice(),
        })
    }

    handleChange = (e) => {
        console.log(e.target.value);

        if (['payment', 'price', 'channel'].includes(e.target.className)) {
            let userInputList = [...this.state.userInputList];
            userInputList[e.target.dataset.id][e.target.className] = e.target.value;

            this.setState(
                {
                    userInputList
                }
            )
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        service.updateUserSubsInfo(this.state.userInputList);
    }

    render() {
        let { userSubsList, userInputList } = this.state;

        return (
            <>
                <div className="container">
                    <p>사용자 구독 서비스 정보 등록</p>
                    <div className="row">
                        <form onSubmit={this.handleSubmit}>
                            {
                                userSubsList.map(
                                    (content, i) => {
                                        let paymentId = `payment-${i}`;
                                        let priceId = `price-${i}`;

                                        return (
                                            <div key={i}>
                                                <span><img src={""} alt="logo" /></span>

                                                <span>{content.name}</span>

                                                <label htmlFor={paymentId}>결제일</label>
                                                <input
                                                    type="text"
                                                    className="payment"
                                                    data-id={i}
                                                    name={paymentId}
                                                    id={paymentId}
                                                    value={userInputList[i].payment}
                                                    onChange={this.handleChange}
                                                    placeholder="payment"
                                                />

                                                <label htmlFor={priceId}>결제금액</label>
                                                <input
                                                    type="text"
                                                    className="price"
                                                    data-id={i}
                                                    name={priceId}
                                                    id={priceId}
                                                    value={userInputList[i].price}
                                                    onChange={this.handleChange}
                                                    placeholder="price"
                                                />
                                                
                                                <div className="radio">
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            className="channel"
                                                            data-id={i}
                                                            value="inapp"
                                                            checked={userInputList[i].channel === 'inapp'}
                                                            onChange={this.handleChange}
                                                        />
                                                        inapp
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            className="channel"
                                                            data-id={i}
                                                            value="site"
                                                            checked={userInputList[i].channel === 'site'}
                                                            onChange={this.handleChange}
                                                        />
                                                        site
                                                    </label>
                                                </div>
                                            </div>
                                        )
                                    }
                                )
                            }
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default SubscribingInfo;