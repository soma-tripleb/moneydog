import React, { Component, PropTypes } from 'react';
import youtube from '../../static/img/youtube.png';

import './List.css';

class List extends Component {
    constructor(props) {
    super(props);
  }
  render() {
    return(
     <div>
       <div className='row'>
         <div className='col-2'>
           <h2>8일</h2>
         </div>
         <hr className='vert'/>
         <div className='col-2'>
           <img className="subscribeImg" src={youtube}
                alt="First slide"/>
         </div>
       </div>
      </div>
    );
  }
}

export default List;
