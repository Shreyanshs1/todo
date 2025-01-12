import React from 'react'
import '../components/Main.css'


const Form = ({input, setInput,todos,setTodos,handleSubmitButton,buttonState}) => {
  return (
    <form>
        <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="Add a new task" />
        <button onClick={(e)=>handleSubmitButton(e)}>{buttonState}</button>
    </form>
  )
}

export default Form