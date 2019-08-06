import React, {Component} from 'react';

import Calendar from '../component/dashboard/Calendar';
import Categories from '../component/dashboard/Categories';

import * as service from '../services/posts';

import 'babel-polyfill';

class DashBoard extends Component {

  onTest = (value) =>{
    this.fetchPostInfo(1);
  };

  fetchPostInfo = async (postId) => {
    const post = await service.getPost(postId);
    console.log(post);
    const comments = await service.getComments(postId);
    console.log(comments);
    const hello = await service.getServerHelloWorld();
    console.log(hello);
  };

  render() {
    return (
        <>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h2>Calendar</h2>
                <Calendar/>
              </div>
              <div className="col-md-6">

                <Categories name="Melon" Dday="17" price="6,500"/>

              </div>
            </div>
            <button onClick={ this.onTest(1) }>test ajax</button>

            <hr/>

              <footer>
                <p>DashBoard</p>
              </footer>
          </div>
        </>
    );
  }
}

export default DashBoard;
