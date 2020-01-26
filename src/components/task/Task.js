import React from 'react';
import { FaTrash } from 'react-icons/fa';
import FormComponent from '../form/FormComponent'
import FormFields from '../../data/app_settings.json'
import { FaPlus } from 'react-icons/fa';

const Task = (props) => {

  console.log(props.tasks);
  const taskList = props.tasks.map((task, index) => {
    console.log(task);

    return (
      <li className='list-group-item li' key={index}>{task}
        <span className='delete' onClick={() => props.removeItem(task.key)}>
          <FaTrash /></span>
      </li>
    )

  })

  return (
    <React.Fragment>
      <div className='add-task'>
        <FormComponent formClass='form addtask-form'
          inputClass='addtask-input'
          InputFields={FormFields.AddTask}
          handleChange={props.handleChange}
          handleSubmit={props.handleSubmit}
          isSubmitBtn BtnClass='btn btn-info taskBtn'
          BtnTitle={<FaPlus />} />
      </div>

      <ul className='list-group'>
        {taskList.sort()}
      </ul>
    </React.Fragment>

  );
}

export default Task;