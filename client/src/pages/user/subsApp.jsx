import React, { Component, createRef } from 'react';

class SubsApp extends Component {
  state = {
    number: this.props.number,
    logo: this.props.logo,
    name: this.props.name,
    label: this.props.label,
  };

  handleClick = () => {
    const { subsAppInfo } = this.props;

    if (subsAppInfo.label === '-') {
      this.props.onDelete(subsAppInfo.number, subsAppInfo.logo, subsAppInfo.name);
    } else {
      this.props.onInsert(subsAppInfo.number, subsAppInfo.logo, subsAppInfo.name);
    }

  }

  render() {
    const { subsAppInfo } = this.props;

    return (
      <div className="container w-100 p-3" id="inner-element">
         <div class="row">
          <div class="col">
            <button onClick={this.handleClick.bind(this)}>
              {subsAppInfo.label}
            </button>
          </div>
          <div class="col">
            <img src="https://s20352.pcdn.co/wp-content/uploads/2018/03/2000px-YouTube_social_white_square_2017.svg_-1-1024x778.png" alt={subsAppInfo.logo} style={{height: '2vh'}} />
          </div>
          <div class="col">
            {subsAppInfo.name}
          </div>
        </div>
      </div>
    )
  }
}

export default SubsApp;