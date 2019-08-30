import React, { Component } from 'react';

import * as service from './subscribingInfo.ajax';

import './subscribingInfo.css';

class SubscribingInfo extends Component {
    constructor(props) {
        super(props);

        this.fetchPostInfo();
        this.state = {
            userSubsList: [],   // 사용자 데이터 받아오기
            userInputList: [],    // 사용자 데이터 전달하기
        }
    }

    fetchPostInfo = async () => {
        const response = await service.getUserSubsInfo();
        const arrCnt = response.data.length;

        let subsInfo = { payment: "", price: "" };
        let subsInfoArr = [];

        for (let i = 0; i < arrCnt; i++) {
            console.log(i);
            subsInfoArr.push({ payment: "", price: "" });
        }

        this.setState({
            userSubsList: response.data.slice(),
            userInputList: subsInfoArr.slice(),
        })
    }

    handleChange = (e) => {
        if (['payment', 'price'].includes(e.target.className)) {
            let userInputList = [...this.state.userInputList];

            console.log('target: ' + e.target.dataset.id + ' ' + e.target.className + ' ' + e.target.value)

            userInputList[e.target.dataset.id][e.target.className] = e.target.value;
            this.setState(
                { userInputList }
            )
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log(this.state.userInputList);
    }

    render() {
        let { userSubsList, userInputList } = this.state;

        return (
            <>
                <div className="container">
                    <p>사용자 구독 서비스 정보 등록</p>
                    <div className="row">
                        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                            {
                                userSubsList.map(
                                    (content, i) => {
                                        let paymentId = `payment-${i}`;
                                        let priceId = `price-${i}`;

                                        return (
                                            <div key={i} className="user-subs-info">
                                                <span><img src={""} alt="logo" /></span>
                                                <span>{content.name}</span>
                                                <label htmlFor={paymentId}>결제일</label>
                                                <input
                                                    type="text"
                                                    name={paymentId}
                                                    data-id={i}
                                                    id={paymentId}
                                                    value={userInputList[i].payment}
                                                    placeholder="payment"
                                                    className="payment"
                                                />
                                                <label htmlFor={priceId}>결제금액</label>
                                                <input
                                                    type="text"
                                                    name={priceId}
                                                    data-id={i}
                                                    id={priceId}
                                                    value={userInputList[i].price}
                                                    placeholder="price"
                                                    className="price"
                                                />
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