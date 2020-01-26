import React, { useState, Component } from 'react'
//import Task from '../components/task/Task';
import '../components/task/task.css'
import { FaTrash } from 'react-icons/fa';
import FormComponent from '../components/form/FormComponent'
import FormFields from '../data/app_settings.json'
import { FaPlus } from 'react-icons/fa';

const TasksListsScreen = ({ listId, lists }) => {
  lists.map((item, index) => {
    return item.tasks.map((task, i) => console.log(task.taskname))
  })
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([{
    taskname: '',
    id: ''
  }])


  const onHandleChange = (e) => {
    setTask(e.target.value)
  }
  console.log('listid:', listId);


  const onHandleSubmit = (e) => {

    e.preventDefault();
    const newTask = task;
    if (newTask !== '') {
      setTasks([...tasks, { taskname: newTask, id: Date.now() }]);

      const data = {
        task_id: Date.now(),
        list_id: listId,
        task_name: newTask,
      }

      fetch('/add/task', {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        }).catch(err => console.log(err))

      setTask('')
    }





  }
  const removeItem = (id) => {

    console.log(id);

    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);

    fetch(`/delete/task?id=${id}`, {
      method: 'delete',
    })
      .then(res => {

        if (res.status === 200) {
          console.log('task deleted');
        } else {
          console.log('error');
        }
      })
      .catch(err => console.log(err))
  }

  const updateList = () => {


  }

  // const compareLists = ()
  const taskList = lists.map((item) => {
    return item.tasks.map((task, index) => {

      return (
        <li className='list-group-item'
          key={index}>{task.taskname}
          <span className='delete' onClick={() => removeItem(task.id)}>
            <FaTrash /></span></li>
      )

    })

  })

  return (
    <div className='task-div'>
      <h4>{''}</h4>
      <div className='tasks-container'>
        <div className='tasks-list'>
          {/* <Task tasks={tasks} list_id={listId} removeItem={removeItem} handleChange={onHandleChange} handleSubmit={onHandleSubmit} task={task} /> */}
          <div className='add-task'>
            <FormComponent formClass='form addtask-form'
              inputValue={task}
              inputClass='addtask-input'
              InputFields={FormFields.AddTask}
              handleChange={onHandleChange}
              handleSubmit={onHandleSubmit}
              isSubmitBtn
              BtnClass='btn btn-info taskBtn'
              BtnTitle={<FaPlus />} />
          </div>
          <ul className='list-group'>
            {taskList.sort()}
          </ul>
        </div>
      </div>
    </div>

  )
}
export default TasksListsScreen;