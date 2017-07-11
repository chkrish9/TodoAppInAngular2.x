var express = require('express');
var router = express.Router();

var Todo = require('../../db/todo');

//retriving todos
router.get('/todos', (req, res, next) => {
    Todo.find((err, todos) => {
        res.json(todos);
    });
    //res.send('Redirected to Contant list');
});

//add todo
router.post('/todo', (req, res, next) => {
    //logic to add todo
    let newTodo = new Todo({
        task: req.body.task,
        isCompleted: req.body.isCompleted,
        isEditing: req.body.isEditing
    });
    newTodo.save((err, todo) => {
        if (err) {
            res.json({ msg: 'Failed while adding new contact', status: 'error' });
        } else {
            // res.json({ msg: 'new contact added successfully' });
            Todo.find((err, todos) => {
                res.json(todos);
            });
        }

    });
});

//update todo
router.put('/todo/:id', function (req, res,next) {
    var id = req.params.id;
    var update = (req.body.task === undefined) ? { isCompleted : req.body.isCompleted }:{ task: req.body.task };
    Todo.findByIdAndUpdate(id, { $set:  update }, (err, result) => {
         if (err) {
            res.json({ msg: 'Failed while updating contact', status: 'error' });
        } else {
            // res.json({ msg: 'new contact added successfully' });
            Todo.find((err, todos) => {
                res.json(todos);
            });
        }
    });
});

//delete todo
router.delete('/todo/:id', (req, res, next) => {
    //logic to delete todo
    Todo.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            res.json({ msg: 'Failed while deleting contact', status: 'error' });
        } else {
            // res.json({ msg: 'new contact added successfully' });
            Todo.find((err, todos) => {
                res.json(todos);
            });
        }
    })
});

module.exports = router;