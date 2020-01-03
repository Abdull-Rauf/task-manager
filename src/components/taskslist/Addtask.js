import React from 'react';
import { FaPlus } from 'react-icons/fa';


const AddTask = props => {
  return (
    <div className='add-ask'>
      <form onSubmit={props.handleSubmit} className='form'>
        <input type="text" className='form-controll' placeholder='Add your todo'
          value={props.currentItem} onChange={props.handleChange} />
        <button className='btn btn-primary ml-2 btn1' type='submit' ><FaPlus /></button>
      </form >
    </div>
  );
}

export default AddTask;