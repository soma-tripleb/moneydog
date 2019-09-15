import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

const PrivateRouter = ({component: Component, status, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(status);
        if (status === 'INIT') {
          const loggedInfo = localStorage.getItem('auth'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
          if (!loggedInfo || loggedInfo === 'undefined') {
            return <Redirect to='/signin'/>;
          }
          return <Component {...props} />;
        } else if (status=== 'SUCCESS') {
          return <Component {...props} />;
        } else if (status === 'WAITING') {
          return LODING;
        } else if (status === 'LOGOUT') {
          return <Redirect to='/signin '/>;
        } else {
          return <Redirect to='/signin'/>;
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  status: state.auth.login.status,
});

export default connect(mapStateToProps)(PrivateRouter);
