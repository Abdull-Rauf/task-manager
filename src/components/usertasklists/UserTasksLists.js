import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './userTaskList.css';

export default class UserTasksLists extends Component {


  state = {
    lists: [],
    list_name: '',
    user_name: '',
    user_id: ''
  }




  componentDidMount() {

    setTimeout(async () => {
      const userId = localStorage.getItem('UserID');
      console.log('userid', userId);
      this.setState({ user_id: userId });
      const endPoint = `http://192.168.10.246:5000/api/find/taskslists?id=${userId}`;
      await fetch(endPoint).then(res => res.json()).then(data => {
        this.setState({ lists: [...this.state.lists, data] })
        console.log("data: ", data);
      })
        .catch(err => console.log(err));
      console.log("WIll update", this.state.lists);
      console.log("Test ")
    }
      , 1000);

  }



  handleChange = (e) => {

    this.setState({ list_name: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();


    const newList = this.state.list_name;
    if (newList !== '') {
      this.setState({ lists: [...this.state.lists, newList], list_name: '' })
    }
  }

  handleLogOut = () => {
    console.log('logout');
    localStorage.removeItem('UserID')
    localStorage.removeItem('UserName')

  }

  render() {

    setTimeout(() => {
      const userID = localStorage.getItem('UserID')
      if (userID === null) {
        return <Redirect to='/' />
      }
    }, 1000);


    return (

      <div className='user-lists'>
        <div>

          <h6 className='text-primary'>Welcome {this.state.user_name}</h6>

        </div>
        <p></p>
        <h5 className='text-primary'>MY LISTS</h5>

        <ul className='my-lists'>
          {/* <form onSubmit={this.handleSubmit} className='add-list' >
            <input type='text' placeholder='Add new list'
              value={this.state.list_name}
              onChange={this.handleChange} />
          </form> */}
          <Link to="/" onClick={this.handleLogOut}>Logout</Link>
          <p></p>
          {this.state.lists.map((list) => (
            list.map((item, index) => <li key={index}>{item.LIST_NAME}</li>)
          ))
          }
        </ul>
      </div>
    );
  }
}