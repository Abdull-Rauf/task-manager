import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './login.css'
class Login extends Component {
  state = {
    isEmpty: false,
    user_id: '',
    username: '',
    password: '',
    inputUserName: '',
    inputPass: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      isError: false
    })
  }



  handleSubmit = (e) => {

    e.preventDefault();

    const url = `/api/find/user?user=${this.state.inputUserName}&pass=${this.state.inputPass}`
    fetch(url)
      .then(res => res.json())
      .then(userInfo => {
        if (userInfo[0] === undefined) {
          return this.setState({ isEmpty: true })
        } else {
          this.setState({ user_id: userInfo[0].ID, username: userInfo[0].user_name, password: userInfo[0].user_pass });
          localStorage.setItem('UserID', this.state.user_id);
          localStorage.setItem('UserName', this.state.username);


          this.setState({ inputUserName: '' });
          this.setState({ inputPass: '' });
        }
      })

  }



  render() {

    if (localStorage.getItem('UserID')) {
      return <Redirect to="/home" />
    }

    return (
      <div className='login-container'>
        <h4>Login</h4>
        <br></br>
        <p>{this.state.isEmpty && <span style={{ color: "red" }}>{"Invalid Input"}</span>}</p>

        <p>{this.state.isError && <span style={{ color: "red" }}>{"User not Found"}</span>}</p>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <input className='input-group' onChange={this.handleChange} type='text' placeholder='Username' name='inputUserName'></input>
          <br></br>
          <input className='input-group' onChange={this.handleChange} type='password' placeholder='Password' name='inputPass'></input>
          <br></br>

          <button type='submit' className='btn btn-primary'>Login</button><span className='bg-light register'><Link to='/register'>Register</Link></span>
        </form>
      </div >
    );
  }
}

export default Login;
