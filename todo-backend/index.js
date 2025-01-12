const express = require('express');
const mongoose = require('mongoose');
const Cors = require('cors');
require('dotenv').config();

const { getTodos, createTodo, updateTodo, deleteTodo } = require('./controllers/todoController');

//config app
const app = express();
//json parser    inbuilt middleware
app.use(express.json());
app.use(Cors());
const port = process.env.PORT || 8000;


const mongo_uri = process.env.MONGO_URI;

mongoose.connect(mongo_uri)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Connection error:", err.message);
    });


    // mongodb+srv://shreyanshsri1807:hSNL9hOyHsbH8Sdg@testdb.v9pbz.mongodb.net/?retryWrites=true&w=majority&appName=TestDB


app.get('/todos',getTodos);
app.post('/todos',createTodo);
app.put('/todos/:id',updateTodo);
app.delete('/todos/:id',deleteTodo);