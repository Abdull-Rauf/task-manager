import React, { Component } from 'react'
import Task from '../components/task/Task';
import AddTask from '../components/taskslist/Addtask';
import '../components/taskslist/taskslist.css'

export default class HomeScreen extends Component {

  state = {
    items: [],
    currentItem: {
      text: '',
      key: ''
    }
  }

  onHandleChange = (e) => {
    this.setState({ currentItem: { text: e.target.value, key: Date.now() } })
  }
  onHandleSubmit = (e) => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== '') {
      this.setState({ items: [...this.state.items, newItem], currentItem: { text: '', key: '' } })
    }
  }
  removeItem = (key) => {
    const filteredItems = this.state.items.filter(item => item.key !== key)
    this.setState({
      items: filteredItems
    })
  }



  render() {
    return (
      <div className='task-div'>
        <h4>Jobs Tasks</h4>
        <div className='tasks-container'>
          <AddTask handleChange={this.onHandleChange} handleSubmit={this.onHandleSubmit} currentItem={this.state.currentItem.text} />
          <div className='tasks-list'>
            <Task items={this.state.items} removeItem={this.removeItem} />
          </div>
        </div>
      </div>

    )
  }
}
