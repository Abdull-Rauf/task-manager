import React, { Component } from 'react';
import TasksListsScreen from './TasksListsScreen'
import Sidebar from '../components/sidebar/Sidebar'
import '../App.css'
import { Redirect } from 'react-router-dom';
import FormFields from '../data/app_settings.json'

export default class MainScreen extends Component {

  state = {
    lists: [],
    tasks: [],
    list_id: '',
    list_name: '',
    user_name: '',
    user_id: '',
    isList: true,
    tl_id: '',
    listName: ''
  }



  componentDidMount() {

    const userId = localStorage.getItem('UserID');

    this.setState({ user_id: userId });

    const endPoint = `/find/tasks?id=${userId}`;

    fetch(endPoint).then(res => res.json())
      .then(data => {

        if (data.length === 0) {
          console.log('No Lists Found');
          this.setState({ isList: false })

        } else {
          data.map(list => {
            return this.setState({ lists: [...this.state.lists, list], list_id: list.listID, isList: true });

          })
        }
      }).catch(err => console.log(err));
  }





  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }





  handleSubmit = (e) => {

    e.preventDefault();

    const newList = this.state.list_name;
    if (newList !== '') {

      this.setState({ lists: [...this.state.lists, { listname: newList }] });

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
      }).catch(err => console.log(err))
    this.setState({ [e.target.value]: '' })


  }




  handleLogOut = () => {
    console.log('logout');
    localStorage.removeItem('UserID')
    localStorage.removeItem('UserName')
  }



  handleListClick = (index, listid) => {

    console.log(listid, index);

    this.setState({ tasks: '', tl_id: '', listName: '' });

    const lists = this.state.lists;
    lists[index].tasks.map(task => {

      this.setState({ tasks: [...this.state.tasks, task.taskname], tl_id: listid, listName: lists[index].listname })


    })
    console.log(this.state.tl_id);
  }




  handleDelete = (listId) => {
    console.log(listId);
    const filteredList = this.state.lists.filter(list => list.listid !== listId);
    this.setState({ lists: filteredList });
    console.log(filteredList);

    fetch(`/delete/list?id=${listId}`, {
      method: 'delete',
    })
      .then(res => {

        if (res.status === 200) {
          console.log('deleted');
        } else {
          console.log('error');
        }
      })
      .catch(err => console.log(err))

  }

  render() {



    if (localStorage.getItem('UserID') === null) {
      return <Redirect to='/' />
    }

    return (

      <div className='main'>
        <Sidebar lists={this.state.lists} listId={this.state.list_id} isList={this.state.isList} handleDelete={this.handleDelete} onHandleChange={this.handleChange} handleSubmit={this.handleSubmit} handleLogOut={this.handleLogOut} handleListClick={this.handleListClick} InputFields={FormFields.ListName} />
        <TasksListsScreen lists={this.state.lists} listId={this.state.tl_id} listName={this.state.listName} />
      </div>
    )
  }
}