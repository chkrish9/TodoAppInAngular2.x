var todos = require('../todos/todos');
var user = require('../user/user');


module.exports = function router(app){
    app.use('/todo-api',todos);
    app.use('/user-api',user);
};