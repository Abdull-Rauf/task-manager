import React from 'react';
import { FaTrash } from 'react-icons/fa';


const Todo = (props) => {
  const items = props.items;
  const listItem = items.map((item, index) => {
    return (
      <li className='list-group-item li' key={index}>{item.text}<span className='delete' onClick={() => props.removeItem(item.key)}>
        <FaTrash /></span></li>
    )
  })

  return (
    <ul className='list-group'>
      {listItem.sort().reverse()}
    </ul>
  );
}

export default Todo;