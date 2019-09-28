import React, {Component} from 'react';

import moment from 'moment';

class List extends Component {
  constructor(props) {
    super(props);
  };

  state = {
    result: null,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const subscriptions = prevProps.data;
    if (subscriptions !== null) {
      subscriptions.some((subscription) => {
        if (moment(subscription.renewal).date() === prevState.date) {
          return this.state.result = subscription;
        } else {
          return this.state.result = '';
        }
      });
    }
  }

  showSubscriptionsByDate = () => {
    const { result } = this.state;

    if (result) {
      return (
          <>
            <div className='list-img-border'>
              <img className="line-img" alt='x' src={'/' + result.logo} />
            </div>
            <div>{result ? result.name : ''}</div>
          </>
      );
    }
  };

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-3'>
            <h3>{this.props.date}일</h3>
          </div>
        </div>

        {this.showSubscriptionsByDate()}

      </div>
    );
  }
}

export default List;
