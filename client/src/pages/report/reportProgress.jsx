import React from 'react';
import {Progress} from 'antd';

const ReportProgress = () => {
  return (
    <div>
      <Progress percent={30} />
      <Progress percent={80} status="active" />
      <Progress percent={70} status="exception" />
      <Progress percent={100} />
      <Progress percent={50} showInfo={false} />
    </div>
  );
};
export default ReportProgress;
