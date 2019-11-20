import React, { Component } from 'react';

import {connect as ReduxConn} from 'react-redux';
import userActions from '../../redux/actions/userAction';

class Spinner extends Component {
  constructor(props) {
    super(props);

    setTimeout(async () => {
      // props 다시 불러오는 api 호출
      await this.props.getSubsInfo();

      // info 페이지로 이동
      this.props.history.push('/user/info');
    }, 20000);
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row align-items-start" style={{height: '20vh'}}>
          </div>
          <div className="row align-items-center">
            <div className="col">
            </div>
            <div className="col">
              <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            <div className="col">
            </div>
          </div>
          <div className="row align-items-end">
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSubsInfo: async () => {
      await dispatch(userActions.getSubsInfo());
    },
  };
};

export default ReduxConn(mapStateToProps, mapDispatchToProps)(Spinner);