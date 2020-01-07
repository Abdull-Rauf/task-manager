import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './userTaskList.css';

export default class UserTasksLists extends Component {

  state = {
    lists: [],
    tasks: [],
    list_id: '',
    list_name: '',
    user_name: '',
    user_id: '',

  }



  componentDidMount() {

    const userId = localStorage.getItem('UserID');

    this.setState({ user_id: userId });

    const endPoint = `/find/tasks?id=${userId}`;

    fetch(endPoint).then(res => res.json()).then(data => {
      data.map(list => {
        return this.setState({ lists: [...this.state.lists, list], list_id: list.listID })
      })

    }).catch(err => console.log(err));

  }




  handleChange = (e) => {

    this.setState({ list_name: e.target.value })
  }




  handleSubmit = (e) => {

    e.preventDefault();

    const newList = this.state.list_name;
    if (newList !== '') {
      this.setState({ list_name: newList })
    }



    const data = {
      list_name: this.state.list_name,
      user_id: this.state.user_id
    }
    fetch('/add/list', {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        if (data === this.state.list_name) {
          console.log('success');

        } else {
          console.log('error');
        }
      })
      .catch(err => console.log(err))



  }




  handleLogOut = () => {
    console.log('logout');
    localStorage.removeItem('UserID')
    localStorage.removeItem('UserName')
  }





  handleListClick = (index) => {

    const lists = this.state.lists;

    return lists[index].tasks.map(task => {
      this.setState({ tasks: '' });
      this.setState({ tasks: [...this.state.tasks, task.taskname] })

      console.log(this.state.tasks);
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

          <h6 className='text-info'>Welcome: {this.state.user_name}<Link to="/" onClick={this.handleLogOut}>Logout</Link></h6>

        </div>
        {/* <p></p>
        <h6 className='text-primary'>MY LISTS</h6> */}
        <form onSubmit={this.handleSubmit} className='my-lists' >
          <input type='text' placeholder=' + Add New List'
            value={this.state.list_name}
            onChange={this.handleChange} size="15" />
        </form>

        <ul className='my-lists'>

          {this.state.lists.map((list, index) => (
            <li key={index} onClick={() => this.handleListClick(index)}>{list.listname}</li>)
          ).sort()}

        </ul>
      </div>
    );
  }
}