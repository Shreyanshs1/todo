import React from 'react'
import './Main.css'
import checked from '../asset/checked.png'
import unchecked from '../asset/unchecked.png'

function Notes({todos,setTodos,handleUpdateButton,handleDeleteButton,handleEditButton}) {
  return (
    <><ul>
    {todos.map((item)=>(
      <li key={item._id}>
        <div onClick={()=>handleUpdateButton(item._id,item.completed)} className='container-with-img'>
        <img className='img-src' src={item.completed?checked:unchecked}/>
        <div className='list-bllt'>
        <h3 className={item.completed?'completed':''} >{item.title}</h3> 
        <p>{item.completed?'Completed':'Not Completed'}</p>
        </div>
        </div>
        <div>
        <button onClick={()=>handleDeleteButton(item._id)}>Delete</button>
        <button onClick={()=>handleEditButton(item._id,item.title)}>Edit</button>
        </div>
      </li>
    ))}
  </ul></>
  )
}

export default Notes