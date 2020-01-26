import React, { Component } from 'react'
import '../components/task/task.css'
import FormComponent from '../components/form/FormComponent'
import FormFields from '../data/app_settings.json'
import { FaPlus, FaTrash, FaFilter } from 'react-icons/fa';


export default class TasksScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {

      lists: [],
      list: {},
      listId: '',
      listName: '',
      taskInput: '',
    }
  }
  fetchTasks = () => {

    fetch()

  }
  componentDidMount() {

    this.setState({ lists: this.props.lists });

  }

  componentWillReceiveProps(nextProps) {

    this.setState({ lists: nextProps.lists, list: nextProps.list, listId: nextProps.ListId, listName: nextProps.listName })
  }


  onHandleChange = (e) => {
    this.setState({ taskInput: e.target.value })
  }


  onHandleSubmit = (e) => {

    e.preventDefault();

    const taskId = Date.now();
    const newTask = this.state.taskInput;

    if (newTask !== '') {
      this.setState({ list: { ...this.state.list, tasks: [...this.state.list.tasks, { tasksid: taskId, taskname: this.state.taskInput }] } })

      const data = {
        task_id: taskId,
        list_id: this.state.listId,
        task_name: newTask,
      }

      fetch('/add/task', {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data.message);
          this.setState({ taskInput: '' })

        }).catch(err => console.log(err))

    }
  }

  handleDeleteTask = (id) => {

    console.log(id);



    fetch(`/delete/task?id=${id}`, {
      method: 'delete',
    })
      .then(res => res.json())
      .then(result => {
        const filteredList = this.state.list.tasks.filter(task => task.id !== id);
        this.setState({ list: filteredList })
      })
      .catch(err => console.log(err))
  }



  render() {

    const list = this.state.list
    console.log(list)

    return (

      this.state.list.tasks == undefined ?
        <h4 className='list-alert'> Select a list from left'</h4> :

        <div className='task-div'>
          <h4>{this.state.listName}</h4>
          <div className='tasks-container'>
            <div className='tasks-list'>
              <div className='add-task'>
                <FormComponent formClass='form addtask-form'
                  inputValue={this.taskInput}
                  inputClass='addtask-input'
                  InputFields={FormFields.AddTask}
                  handleChange={this.onHandleChange}
                  handleSubmit={this.onHandleSubmit}
                  isSubmitBtn
                  BtnClass='btn btn-info taskBtn'
                  BtnTitle={<FaPlus />} />
              </div>

              <ul>

                {
                  this.state.list.tasks !== undefined &&
                  list.tasks.map((task, index) =>
                    <li className='list-group-item li'
                      key={index}>{task.taskname}<span
                        className='delete'><FaTrash
                          onClick={() => this.handleDeleteTask(task.taskid)} /></span></li>
                  )

                }

                {/* {
                this.state.lists.map(list => {
                  return list.listid === this.state.listId &&
                    list.tasks.map((task, index) =>
                      <li className='list-group-item li'
                        key={index}>{task.taskname}<span
                          className='delete'><FaTrash
                            onClick={() => this.handleDeleteTask(task.taskid)} /></span></li>
                    )
                })
              } */}
              </ul>
            </div>
          </div>
        </div>
    )
  }
}
