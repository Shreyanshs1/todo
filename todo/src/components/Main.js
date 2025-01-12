import React, { useEffect } from 'react'
import Form from '../Form/Form'
import { useState } from 'react'
import axios from 'axios'
import Notes from './Notes'
import './Main.css'

const Main = () => {
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editId, setEditId] = useState();
    const [buttonState,setButtonState] = useState('Add')

    //Fetch Tasks Functions

    const fetchTasks = ()=>{
      axios.get('http://localhost:8000/todos/')
      .then((res)=>{
        setTodos(res.data);
        setLoading(false);
      }).catch((err)=>{
        setError(err);
        console.log(err);
        setLoading(false);
      })
    }


    useEffect(() => {
      fetchTasks();
    },[]);

    //Basic Fuctions

    if(loading){
      return <h1>Loading...</h1>
    }
    if(error){
      return <p>{error}</p>
    }


    //Submit Button Function

    const handleSubmitButton = (e)=>{
      e.preventDefault();
      if(buttonState==='Update'){
        submitEdit();
      }else{
      if(input.length===0){
        alert('Badmoshi nhi mittr');
        return null;
      }
      setInput('');
      const dataToSend={title:input,completed:false};
      console.log(dataToSend);
      axios.post('http://localhost:8000/todos/',dataToSend)
      .then((response)=>{
        fetchTasks();
      }).catch((err)=>{
        console.log(err);
      })
      }
    }

    //Edit button function

    const handleEditButton = (id,title)=>{
      setEditId(id);
      setInput(title);
      setButtonState('Update');
    }

    //submitEdit Function

    const submitEdit=()=>{
      axios.put(`http://localhost:8000/todos/${editId}`,{title:input})
      .then((response)=>{
        console.log('Putted');
        fetchTasks();
      })
      .catch((err)=>{
        console.log(err);
      })
      setInput('')
      setButtonState('Add')
    }

    //delete button function

    
    const handleDeleteButton = (id)=>{
      console.log(id);
      axios.delete(`http://localhost:8000/todos/${id}`)
      .then((response)=>{
        console.log('deleted');
        fetchTasks();
      })
      .catch(error=>console.log(error));
      console.log(`http://localhost:8000/todos/${id}`)
    }

    //put button function

    const handleUpdateButton = (id,completed)=>{
      const state = completed?false:true;
      axios.put(`http://localhost:8000/todos/${id}`,{completed:state})
      .then((response)=>{
        console.log('Putted');
        fetchTasks();
      })
      .catch((err)=>{
        console.log(err);
      })
    }


  return (
    <div id='main-app'>
        {/* Form Component */}

        <Form input={input} setInput={setInput} todos={todos} setTodos={setTodos} handleSubmitButton={handleSubmitButton} buttonState={buttonState}/>
        {/* Notes Component */}
        
        <Notes todos={todos} setTodos={setTodos} handleDeleteButton={handleDeleteButton} handleUpdateButton={handleUpdateButton} handleEditButton={handleEditButton}/>
    </div>
  )
}

export default Main