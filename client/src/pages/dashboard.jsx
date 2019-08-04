import React, {Component} from 'react';

import Calendar from '../component/dashboard/Calendar';
import Categories from '../component/dashboard/Categories';

import * as service from '../services/posts';


class DashBoard extends Component {

  fetchPostInfo = async (postId) => {
    const post = await service.getPost(postId);
    console.log(post);
    const comments = await service.getComments(postId);
    console.log(comments);
  }

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
