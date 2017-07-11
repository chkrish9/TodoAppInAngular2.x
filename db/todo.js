const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    task :{
        type: String,
        required:true
    },
    isCompleted :{
        type: Boolean
    },
    isEditing :{
        type: Boolean 
    }
});

const Todo = module.exports = mongoose.model('Todo', TodoSchema);