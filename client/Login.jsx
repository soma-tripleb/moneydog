const React = require('react');
const { Component } = React;

class Login extends Component {
  state = {
    id: 'jaeyeon',
    password: '12345',
  }

  onSubmit = (e) => {
    console.log('전달받은 값 : ', e.target.value);
  }

  render() {
    return (
      <React.Fragment>
        <form action='/' onSubmit={this.onSubmit}>
          <label>id : </label>
          <input id='user_id' type='String' placeholder='Enter the id' />
          <label>password : </label>
          <input id='user_password' type="password" placeholder='Enter the password' />
          <button type='submit'>입력</button>
        </form>
      </React.Fragment>
    );
  }
}

module.exports = Login;
