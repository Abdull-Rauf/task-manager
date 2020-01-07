import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
class Register extends Component {
  state = {
    username: '',
    password: '',
    isSuccess: false,
    isEmpty: false
  }

  handleSubmit = (e) => {

    e.preventDefault();

    if (this.state.username === '' && this.state.password === '') {

      return this.setState({ isEmpty: true })

    } else {
      const data = {
        user_name: this.state.username,
        user_pass: this.state.password
      }


      const url = '/add/user'
      fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(data => {
          if (data === this.state.username) {
            console.log('success');
            this.setState({ username: '', password: "", isSuccess: true });

          } else {
            console.log('error');
          }
        })
        .catch(err => console.log(err))

    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    if (this.state.isEmpty) {
      alert("Username must have minimum 4 characters.")
    } else if (this.state.isSuccess) {
      alert("Your account has been registered.")
      return <Redirect to="/" />
    }


    return (
      <div className='login-container'>
        <h4>Register</h4>
        <br></br>
        <form className='login-form' onSubmit={this.handleSubmit} >
          <input className='input-group' name='username' onChange={this.handleChange} type='text' placeholder='Username'></input>
          <br></br>
          <input className='input-group' name='password' onChange={this.handleChange} type='password' placeholder='Password'></input>
          <br></br>

          <button type='submit' className='btn btn-primary'>Register</button><span className='bg-light register'><Link to='/'>Login</Link></span>

        </form>

      </div >
    );
  }
}

export default Register;
