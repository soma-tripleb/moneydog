import React, {Component} from 'react';

import Item from './item';
import {PageHeader, Spin, Icon} from 'antd';

class Categories extends Component {
  state = {
    subscriptions: null,
  };

  showUserSubsList = () =>{
    const list = this.props.data.map(
      (data, index) => (
        <Item key={index} data={data}/>
      )
    );
    return list;
  };

  render() {
    if (this.props.data == null) {
      const icon = <Icon type="loading" style={{fontSize: 24}} spin />;
      return (<Spin indicator={icon} />);
    }

    return (
      <div>
        <PageHeader></PageHeader>
        {/* <PageHeader
          extra={[
            <Button key="2" onClick={() => {this.sortByPrice(data);}}>가격 순</Button>,
            <Button key="1" onClick={() => {this.sortByLeftDay(data);}}>남은 일</Button>,
          ]}>
        </PageHeader> */}
        <div>
          {this.showUserSubsList()}
        </div>
      </div>
    );
  }
}

export default Categories;
