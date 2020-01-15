import React, { Component } from 'react'
import Register from '../components/register/Register'
import FormFields from '../data/app_settings.json'
import { Link, Redirect } from 'react-router-dom';
import '../components/form/form.css'


export default class RegisterScreen extends Component {
  state = {
    username: '',
    password: '',
    isSuccess: false,
    isEmpty: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (e) => {

    e.preventDefault();
    console.log('registerComp');
    console.log(this.state.username);


    if (this.state.username === '' && this.state.password === '') {

      return this.setState({ isEmpty: true })

    } else {

      const data = {
        user_name: this.state.username,
        user_pass: this.state.password
      }


      fetch('/add/user', {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.username === this.state.username && data.password === this.state.password) {
            console.log('success');
            this.setState({ username: '', password: '', isSuccess: true });

          } else {
            console.log('error');
          }
        })
        .catch(err => console.log(err))
    }

  }



  render() {

    if (this.state.isSuccess) {
      return <Redirect to='/' />
    }

    return (
      <div className='form-container'>
        <Register handleSubmit={this.handleSubmit} formFields={FormFields.Register} handleChange={this.handleChange} isEmpty={this.state.isEmpty} />
        <br></br>
        <span className='register'><Link to='/' >Login</Link></span>
      </div >

    );
  }
}
