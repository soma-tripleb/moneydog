import React, { Component } from 'react';
import Cookies from 'js-cookie';
import update from 'react-addons-update';

import { connect as ReduxConn } from 'react-redux';

import './subscribingInfo.css';

const mapStateToProps = (state) => ({
  users: state.users,
});

class SubscribingInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userSubsList: [],
      userInputList: [],
    };
  }

  componentWillMount = () => {
    this.getUserSubsList();
  }

  getUserSubsList = () => {
    const subsList = this.props.users.subsTmplList;
    const subsInfoList = [];

    subsList.map((subs) => {
      const serviceName = subs.name;
      console.log(subs);

      subsInfoList.push(
        {
          title: serviceName,
          payment: '',
          price: '',
          channel: '',
        }
      );
    });

    this.setState({
      userSubsList: [...this.state.userSubsList, subsList],
      userInputList: [...this.state.userInputList, subsInfoList],
    });
  }

  handleChange = (e) => {
    if (['payment', 'price', 'channel'].includes(e.target.className)) {
      const userInputList = [...this.state.userInputList];
      userInputList[e.target.dataset.id][e.target.className] = e.target.value;

      this.setState(
        {
          userInputList,
        }
      );
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // service.updateUserSubsInfo(this.state.userInputList);
  }

  InputSubscriptionTemplateInfo = () => {
    return (
      this.state.userSubsList.map((content, i) => {
        const paymentId = `payment-${i}`;
        const priceId = `price-${i}`;

        //HTML 파싱하기
      })
    );
  }

  render() {
    const { userSubsList, userInputList } = this.state;

    return (
      <>
        <div className="container">
          <p>사용자 구독 서비스 정보 등록</p>
          <div className="row">
            <form onSubmit={this.handleSubmit}>
              {this.InputSubscriptionTemplateInfo()}
              {
                userSubsList.map((content, i) => {
                  const paymentId = `payment-${i}`;
                  const priceId = `price-${i}`;
                  // <div key={i}>
                  //   <span><img className="substmpl-logo" src={`./` + content.logo} alt="logo" /></span>

                  //   <span className="substmpl-name">{content.name}</span>

                  //   <label htmlFor={paymentId}>결제일</label>
                  //   <input
                  //     type="text"
                  //     className="payment"
                  //     data-id={i}
                  //     name={paymentId}
                  //     id={paymentId}
                  //     value={userInputList[i].payment}
                  //     onChange={this.handleChange}
                  //     placeholder="payment"
                  //   />

                  //   <label htmlFor={priceId}>결제금액</label>
                  //   <input
                  //     type="text"
                  //     className="price"
                  //     data-id={i}
                  //     name={priceId}
                  //     id={priceId}
                  //     value={userInputList[i].price}
                  //     onChange={this.handleChange}
                  //     placeholder="price"
                  //   />

                  //   <div className="radio">
                  //     <label>
                  //       <input
                  //         type="radio"
                  //         className="channel"
                  //         data-id={i}
                  //         value="inapp"
                  //         checked={userInputList[i].channel === 'inapp'}
                  //         onChange={this.handleChange}
                  //       />
                  //       inapp
                  //     </label>
                  //     <label>
                  //       <input
                  //         type="radio"
                  //         className="channel"
                  //         data-id={i}
                  //         value="site"
                  //         checked={userInputList[i].channel === 'site'}
                  //         onChange={this.handleChange}
                  //       />
                  //       site
                  //     </label>
                  //   </div>
                  // </div>
                })
              }
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default ReduxConn(mapStateToProps)(SubscribingInfo);
