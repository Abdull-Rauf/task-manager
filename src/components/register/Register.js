import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
class Register extends Component {
  state = {

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
    fetch(url, {
      method: 'POST',
      headers: ''

    })
      .then(res => res.json())
      .then(userInfo => {
        this.setState({ user_id: userInfo[0].ID, username: userInfo[0].user_name, password: userInfo[0].user_pass })

      })


    if (this.state.inputUserName === this.state.username && this.state.inputPass === this.state.password) {
      console.log('welcome');
      this.setState({ isUser: true })
    } else {
      console.log('error');
    }
    console.log(this.state.isUser);

    this.setState({ inputUserName: '' });
    this.setState({ inputPass: '' });

    localStorage.setItem('UserID', this.state.user_id, 'UserName', this.state.username);
    localStorage.setItem('UserName', this.state.username);
    if (this.state.isUser) {
      return <Redirect to="/home" />
    }

  }



  render() {


    return (
      <div className='login-container'>
        <h4>Register</h4>
        <br></br>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <input className='input-group' value={this.state.inputUserName} onChange={this.handleUsername} type='text' placeholder='Username'></input>
          <br></br>
          <input className='input-group' value={this.state.inputPass} onChange={this.handlePassword} type='password' placeholder='Password'></input>
          <br></br>

          <button type='submit' className='btn btn-primary'>Register</button><span className='bg-light register'><Link to='/'>Login</Link></span>
        </form>

      </div >
    );
  }
}

export default Register;
