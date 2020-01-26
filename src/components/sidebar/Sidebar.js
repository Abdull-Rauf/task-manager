import React from 'react';
import './sidebar.css';
import FormComponent from '../form/FormComponent';
import { FaTimes } from 'react-icons/fa';



const Sidebar = (props) => {



  const lists = props.lists;

  return (

    <div className='user-lists'>
      <div className='welcome-div'>
        <h5>My Lists</h5>


      </div>
      <br></br>

      <FormComponent formClass='form sidebar-form' inputValue={props.inputValue} inputClass='list-input' InputFields={props.InputFields} handleChange={props.onHandleChange} handleSubmit={props.handleSubmit} isSubmitBtn={false} />

      <ul className='my-lists'>

        {props.isList === false && <span style={{ 'color': 'red' }}>No Lists Found</span>}

        {lists.map((list, index) => (

          <li key={index}><span className='listName'
            onClick={() => props.handleListClick(index, list.listid, list.listname)}>{list.listname}
          </span>
            <span className='delete' onClick={() => props.handleDelete(list.listid)}><FaTimes /></span></li>

        )
        ).sort()}

      </ul>
    </div>
  );
}
export default Sidebar;