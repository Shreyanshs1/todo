const mongoose = require('mongoose');
const Todos = require('../dbTodos');

const getTodos = async (req, res) => {
    try {
        const todos = await Todos.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const createTodo = async (req, res) => {
    const todo = req.body;
    try {
        const newTodo = await Todos.create(todo);
        res.status(200).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const todo = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('No Todo with that id');
        }
        const todoID= {_id:id};
        const update = {completed:true};
        const updatedTodo = await Todos.findByIdAndUpdate(todoID,todo,{new:true});
        if(!updatedTodo) {return res.status(404).send('No Todo with that id');}
        res.status(200).send(updatedTodo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {return res.status(404).send('No Todo with that id');}
        const deletedTodo = await Todos.findByIdAndDelete({_id:id});
        res.status(200).send(deletedTodo);
    } catch (error) {
        res.status(404).json({ message: "Ducked" });
    }
};

module.exports={
    getTodos, createTodo, updateTodo, deleteTodo,
};