import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Login from '../components/login/Login';
import FormFields from '../data/app_settings.json'
import '../components/form/form.css'


export default class LoginScreen extends Component {

  state = this.initialState;
  get initialState() {
    return {
      isEmpty: false,
      isError: false,
      user_id: '',
      username: '',
      password: '',
      inputUserName: '',
      inputPass: '',
    }
  }

  handleChange = (e) => {
    console.log('object');
    this.setState({

      [e.target.name]: e.target.value, isEmpty: false
    })
  }



  handleSubmit = (e) => {

    e.preventDefault();

    if (this.state.inputUserName === '' && this.state.inputPass === '') {

      return this.setState({ isEmpty: true })

    }

    const url = `/find/user?user=${this.state.inputUserName}&pass=${this.state.inputPass}`
    fetch(url)
      .then(res => res.json())
      .then(userInfo => {

        if (userInfo[0] === undefined) {
          return this.setState({ isError: true })
        } else {
          this.setState({ user_id: userInfo[0].userID, username: userInfo[0].user_name, password: userInfo[0].user_pass });
          localStorage.setItem('UserID', this.state.user_id);
          localStorage.setItem('UserName', this.state.username);

          this.setState(this.initialState);

        }
      })

  }
  render() {

    if (localStorage.getItem('UserID')) {
      return <Redirect to="/home" />
    }

    return (
      <div className='form-container'>
        <Login handleSubmit={this.handleSubmit} LoginFields={FormFields.Login} handleChange={this.handleChange} isEmpty={this.state.isEmpty} isError={this.state.isError} />
        <br></br>
        <span className='register'><Link to='/register'>Register</Link></span>
      </div>

    );
  }
}
