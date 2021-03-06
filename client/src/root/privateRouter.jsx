import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

const PrivateRouter = ({component: Component, status, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (status === 'INIT') {
          return <Redirect to='/'/>;
        } else if (status=== 'SUCCESS') {
          return <Component {...props} />;
        } else if (status === 'ADD_SUBS_STEP') {
          return <Component {...props} />;
        } else if (status === 'WAITING') {
          return <> LODING </>;
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
