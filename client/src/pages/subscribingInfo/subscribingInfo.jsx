import React, { Component } from 'react';

import * as service from './subscribingInfo.ajax';

import './subscribingInfo.css';

/*
react dynamic form
https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c

react form
https://ko.reactjs.org/docs/forms.html
*/
class SubscribingInfo extends Component {
    constructor(props) {
        super(props);

        this.fetchPostInfo();
        this.state = {
            userSubsList: [],
            userInputList: [],
        }
    }

    fetchPostInfo = async () => {
        const response = await service.getUserSubsInfo();
        const arrCnt = response.data.length;

        let subsInfo = { payment: '', price: '' };
        let subsInfoArr = [];

        for (let i = 0; i < arrCnt; i++) {
            subsInfoArr.push(subsInfo);
        }

        console.log(arrCnt);
        this.setState({
            userSubsList: response.data.slice(),
            userInputList: subsInfoArr.slice(),
        })
    }

    handleChange = (e) => {
        // let userInputList = [...this.state.userInputList];
        // userInputList[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase();
        // this.setState(
        //     { userInputList }, () => console.log(this.state.userInputList)
        // )
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log(this.state.userPaymentList);
    }

    render() {
        let { userInputList } = this.state;

        return (
            <>
                <div className="container">
                    <p>사용자 구독 서비스 정보 등록</p>
                    <div className="row">
                        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                            {this.state.userSubsList.map(
                                (content, i) => {
                                    let subsPaymentId = `payment-${i}`;
                                    let subsPriceId = `price-${i}`;

                                    return (
                                        <div key={i} className="user-subs-info">
                                            <span><img src={""} alt="logo" /></span>
                                            <span>{content.name}</span>
                                            <label htmlFor={subsPaymentId}>결제일</label>
                                                <input type="text"
                                                    name={subsPaymentId}
                                                    data-id={i}
                                                    id={subsPaymentId}
                                                    value={userInputList[i].payment}
                                                    className="payment" 
                                                    />
                                            <label>결제금액</label> 
                                                <input type="text" />
                                        </div>
                                    )
                                }
                            )}
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default SubscribingInfo;