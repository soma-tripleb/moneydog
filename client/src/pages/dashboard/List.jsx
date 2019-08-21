import React, { Component, PropTypes } from 'react';

import youtube from '../../static/img/youtube.png';
import Netflix from '../../static/img/templogo/netflix.png';
import Melon from '../../static/img/templogo/melon.png';
import Tving from '../../static/img/templogo/tving.png';
import Watcha from '../../static/img/templogo/watcha.png';

import './List.css';

class List extends Component {
    constructor(props) {
    super(props);
  }
  render() {
      console.log(youtube);
    return(
     <div>
       <div className='row img-back'>
         <div className='col-3'>
           <h3>22일</h3>
         </div>
         <div className='img-border'>
           <img className="line-Img" src={Melon}
                alt="First slide" style={{height: '5vh', borderRadius: '5px'}}/>
         </div>

       </div>
      </div>
    );
  }
}

export default List;
