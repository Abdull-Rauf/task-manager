import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './userTaskList.css';

export default class UserTasksLists extends Component {

  state = {
    lists: [],
    list_id: '',
    list_name: '',
    user_name: '',
    user_id: ''
  }
  componentDidMount() {


    const userId = localStorage.getItem('UserID');

    this.setState({ user_id: userId });

    const endPoint = `/api/find/taskslists?id=${userId}`;

    fetch(endPoint).then(res => res.json()).then(data => {
      data.map(list => {
        return this.setState({ lists: [...this.state.lists, list], list_id: list.ID })
      })

    })
      .catch(err => console.log(err));

  }
  handleChange = (e) => {

    this.setState({ list_name: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();


    const newList = this.state.list_name;
    if (newList !== '') {
      this.setState({ lists: [...this.state.lists, newList] })
    }
  }

  handleLogOut = () => {
    console.log('logout');
    localStorage.removeItem('UserID')
    localStorage.removeItem('UserName')

  }
  handleListClick = (index) => {
    console.log(index + 1);

    const listId = index + 1;
    fetch(`api/find/tasks?id=${listId}`)
      .then(res => res.json())
      .then(tasks => {
        tasks.map(task => {
          return console.log(task.content);
        })

      })

  }

  render() {

    const userID = localStorage.getItem('UserID')
    if (userID === null) {
      return <Redirect to='/' />

    }


    return (

      <div className='user-lists'>
        <div className='welcome-div'>

          <h6 className='text-primary'>Welcome: {this.state.user_name}<Link to="/" onClick={this.handleLogOut}>Logout</Link></h6>

        </div>
        {/* <p></p>
        <h6 className='text-primary'>MY LISTS</h6> */}
        <form onSubmit={this.handleSubmit} className='my-lists' >
          <input type='text' placeholder='Add new list'
            value={this.state.list_name}
            onChange={this.handleChange} size="15" />
        </form>

        <ul className='my-lists'>

          {this.state.lists.map((list, index) => (
            <li key={index} onClick={() => this.handleListClick(index)}>{list.LIST_NAME}</li>)
          ).sort().reverse()}

        </ul>
      </div>
    );
  }
}