import React, { Component } from 'react'

import '../../static/style/page/subscriptions.css';

class Subscriptions extends Component {

  createComponent = (e) => {

    // newElement.innerHTML = document.getElementById('my-subs-container').innerHTML;   // 이것도 해당 태그를 가져옴

    let newElement = document.createElement('div');
    newElement.innerHtml = e.target;
    document.getElementById('my-subs-container').appendChild(e);

    var newDivHtml = "<span>추가할 내용</span>";

    var div = document.createElement("div");
    div.id = "aaa";
    div.innerHTML = newDivHtml;

    document.appendChild(div);

    console.log("success");
  }

  render() {
    return (
      <>
        <h1>Subscriptions</h1>
        <div className="subs-container">

          <div className="subs-inner-left-container mh-100 d-inline-block">
            Height 25%

            <div className="w-100 p-3" id="subs-inner-left-element" onClick={this.createComponent}>
              <p>Width 25%</p>
            </div>
            <div className="w-100 p-3" id="subs-inner-left-element" onClick={this.createComponent}>
              <p>Width 25%</p>
            </div>
            <div className="w-100 p-3" id="subs-inner-left-element" onClick={this.createComponent}>
              <p>Width 25%</p>
            </div>
            <div className="w-100 p-3" id="subs-inner-left-element" onClick={this.createComponent}>
              <p>Width 25%</p>
            </div>
            <div className="w-100 p-3" id="subs-inner-left-element" onClick={this.createComponent}>
              <p>Width 25%</p>
            </div>
            <div className="w-100 p-3" id="subs-inner-left-element" onClick={this.createComponent}>
              <p>Width 25%</p>
            </div>
            <div className="w-100 p-3" id="subs-inner-left-element" onClick={this.createComponent}>
              <p>Width 25%</p>
            </div>
            

          </div>

          <div className="subs-inner-center-container mh-100 d-inline-block">
            Height 25%
          </div>

          <div className="subs-inner-right-container mh-100 d-inline-block">
            Height 25%

            <div className="w-100 p-3" id="subs-inner-right-element">
              <p>Width 25%</p>
            </div>
            <div className="w-100 p-3" id="subs-inner-right-element">
              <p>Width 25%</p>
            </div>
            <div className="w-100 p-3" id="subs-inner-right-element">
              <p>Width 25%</p>
            </div>

          </div>

        </div>
      </>
    );
  }
}

export default Subscriptions;