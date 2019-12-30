import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './login.css'
class Login extends Component {
  state = {
    isUser: false,
    user_id: '',
    username: '',
    password: '',
    inputUserName: '',
    inputPass: ''
  }

  handleUsername = (e) => {
    this.setState({ inputUserName: e.target.value })

  }
  handlePassword = (e) => {
    this.setState({ inputPass: e.target.value })

  }

  handleSubmit = (e) => {
    e.preventDefault();

    const url = `http://192.168.10.246:5000/api/find/user?user=${this.state.inputUserName}&pass=${this.state.inputPass}`
    fetch(url)
      .then(userInfo fetchUser.json())
    console.log(userInfo);

    this.setState({ user_id: userInfo[0].ID, username: userInfo[0].user_name, password: userInfo[0].user_pass })
    if (this.state.inputUserName === this.state.username && this.state.inputPass === this.state.password) {
      console.log('welcome');
      this.setState({ isUser: true })
    } else {
      console.log('error');
    }
    console.log(this.state.isUser);

    this.setState({ inputUserName: '' });
    this.setState({ inputPass: '' });

    localStorage.setItem('UserID', this.state.user_id);
    localStorage.setItem('UserName', this.state.username);



  }



  render() {
    if (this.state.isUser === true) {
      return <Redirect to="/home" />
    }

    return (
      <div className='login-container'>
        <h4>Login</h4>
        <br></br>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <input className='input-group' value={this.state.inputUserName} onChange={this.handleUsername} type='text' placeholder='Username'></input>
          <br></br>
          <input className='input-group' value={this.state.inputPass} onChange={this.handlePassword} type='password' placeholder='Password'></input>
          <br></br>

          <button type='submit' className='btn btn-primary'>Login</button><span className='bg-light register'><Link to='/register'>Register</Link></span>
        </form>

        {/* {this.state.isUser === true ? <Link to="/home">Connected to DB !!!</Link> : null} */}
      </div >
    );
  }
}

export default Login;
