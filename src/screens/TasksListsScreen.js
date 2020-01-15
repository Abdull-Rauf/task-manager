import React, { useState } from 'react'
//import Task from '../components/task/Task';
import '../components/task/task.css'
import { FaTrash } from 'react-icons/fa';
import FormComponent from '../components/form/FormComponent'
import FormFields from '../data/app_settings.json'
import { FaPlus } from 'react-icons/fa';

const TasksListsScreen = ({ listId, listName }) => {



  const [task, setTask] = useState([{ taskname: '', id: '' }])


  const onHandleChange = (e) => {
    setTask([{ taskname: e.target.value, id: Date.now() }])
  }

  const onHandleSubmit = (e) => {

    e.preventDefault();

    const data = {
      task_id: task.id,
      list_id: listId,
      task_name: task.taskname,
    }
    console.log(task.id)
    fetch('/add/task', {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        if (data === task) {
          console.log('success');
        } else {
          console.log('error');
        }
      }).catch(err => console.log(err))


  }
  const removeItem = (key) => {

  }
  // const taskList = lists.tasks.map((task, index) => {

  //   return (
  //     <li className='list-group-item li' key={index}>{task}<span className='delete' onClick={() => removeItem(task.key)}>
  //       <FaTrash /></span></li>
  //   )

  // })

  return (
    <div className='task-div'>
      <h4>{listName}</h4>
      <div className='tasks-container'>
        <div className='tasks-list'>
          {/* <Task tasks={tasks} list_id={listId} removeItem={removeItem} handleChange={onHandleChange} handleSubmit={onHandleSubmit} task={task} /> */}
          <div className='add-task'>
            <FormComponent formClass='form addtask-form' inputClass='addtask-input' InputFields={FormFields.AddTask} handleChange={onHandleChange} handleSubmit={onHandleSubmit} isSubmitBtn BtnClass='btn btn-info taskBtn' BtnTitle={<FaPlus />} />
          </div>

          <ul className='list-group'>
            {/* {taskList.sort()} */}
          </ul>
        </div>
      </div>
    </div>

  )
}
export default TasksListsScreen;