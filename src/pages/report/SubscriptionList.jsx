import React, { Component } from 'react';

class SubscriptionList extends Component {
  showSubsList = () =>{
    if ( typeof this.props.data === 'undefined') {
      return;
    }

    const list = this.props.data.map(
      (content, i) => (
        <div key={i} className="container w-100 p-3" id="inner-element">
          <div className="row">
            <div className="col">
              {content.name}
            </div>
            <div className="col">
              {content.price}
            </div>
            <div className="col">
              {content.channel}
            </div>
          </div>
        </div>)
    );
    return list;
  };

  render() {
    return (
      <>
        {/*<div className="col-sm report-inner-container">*/}
        {/*  <div className="w-100 p-3" id="inner-container">*/}
           구독 리스트
            {this.showSubsList()}
        {/*  </div>*/}
        {/*</div>*/}
      </>
    );
  }
}

export default SubscriptionList;
