import React, {Component} from 'react';

class SubsApp extends Component {
  handleClick = () => {
    const {subsAppInfo, onDelete, onInsert} = this.props;

    if (subsAppInfo.label === '-') {
      onDelete(subsAppInfo.seq, subsAppInfo.logo, subsAppInfo.name);
    } else {
      onInsert(subsAppInfo.seq, subsAppInfo.logo, subsAppInfo.name);
    }
  };

  render() {
    const {subsAppInfo} = this.props;
    return (
      <>
        <div className="container w-100" id="inner-element">
          <div className="row">
            <div className="col">
              <img className="logo-img" src={`/` + subsAppInfo.logo} alt="x" />
            </div>
            <div className="col">
              {subsAppInfo.name}
            </div>
            <div className="col">
              <button onClick={this.handleClick}>
                {subsAppInfo.label}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SubsApp;
