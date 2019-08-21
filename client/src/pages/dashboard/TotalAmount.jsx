import React, { Component } from 'react';

class TotalAmount extends Component {
    constructor(props) {
    super(props);
  }
  render() {
    return(
     <div>
      TotalAmount
       <div className="container w-100 p-3" id="inner-element">
         <div className="row">
           <div className="col">
             <button>
             8월 의 총 이용 금액은 36800 원 입니다 !
             </button>
           </div>
         </div>
       </div>
       <div className="container w-100 p-3" id="inner-element">
         <div className="row">
           <div className="col">
             <button>
               7월 의 총 이용 금액은 29600 원 입니다 !
             </button>
           </div>
         </div>
       </div>
      </div>
    );
  }
}

export default TotalAmount;
