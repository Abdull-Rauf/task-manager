import React, { Component } from 'react';
import TasksScreen from './TasksScreen'
import Sidebar from '../components/sidebar/Sidebar'
import '../App.css'
import { Redirect } from 'react-router-dom';
import FormFields from '../data/app_settings.json';



export default class MainScreen extends Component {

  state = {
    lists: [],
    list: {},
    list_id: '',
    list_name: '',
    user_name: '',
    user_id: '',
    isList: true,
    listName: '',
    nextId: 235

  }






  fetchData = () => {

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



  componentDidMount() {

    this.fetchData();

  }



  handleChange = (e) => this.setState({ [e.target.name]: e.target.value })


  handleSubmit = (e) => {

    e.preventDefault();

    this.setState({ lists: [] });

    const data = {
      list_id: this.state.nextId + 1,
      list_name: this.state.list_name,
      user_id: this.state.user_id
    }

    fetch('/add/list', {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
      .then(res => res.json()).then(result => {
        console.log(result);
        this.fetchData();
        this.setState({ list_name: '', nextId: this.state.nextId + 1 })
      })


  }




  handleLogOut = () => {
    console.log('logout');
    localStorage.removeItem('UserID')
    localStorage.removeItem('UserName')
  }


  handleListClick = (index, listid, listname) => {


    const list = this.state.lists.find(list => list.listid === listid);
    list.tasks.map(task => console.log(task.taskname))
    this.setState({ list: list, list_id: listid, listName: listname });


  }



  handleDelete = (listId) => {

    fetch(`/delete/list?id=${listId}`, {
      method: 'delete',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(result => {
        console.log(result);
        let filteredLists = this.state.lists.filter(list => list.listid !== listId);
        this.setState({ lists: filteredLists })
      })
  }




  render() {


    if (localStorage.getItem('UserID') === null) {
      return <Redirect to='/' />
    }
    return (

      <div className='main'>
        <Sidebar lists={this.state.lists}
          listId={this.state.list_id}
          isList={this.state.isList}
          handleDelete={this.handleDelete}
          onHandleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleLogOut={this.handleLogOut}
          handleListClick={this.handleListClick}
          inputValue={this.state.list_name}
          InputFields={FormFields.ListName} />
        <TasksScreen lists={this.state.lists} list={this.state.list} ListId={this.state.list_id} listName={this.state.listName} />
      </div>
    )
  }
}