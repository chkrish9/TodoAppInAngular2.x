import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import { Todo } from './todo';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {

  constructor(private http: Http) { }

  //retriving todo service

  getTodos() {
    return this.http.get('https://todoapp-ang2.herokuapp.com/todo-api/todos')
      .map(res => res.json());
  }

  //add todo
  addTodo(newTodo) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://todoapp-ang2.herokuapp.com/todo-api/todo', newTodo, options)
      .map(res => res.json());
  
  }

  //update todo
  updateTodo(todo, editIsCompleted){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `https://todoapp-ang2.herokuapp.com/todo-api/todo/${todo._id}`;
    var update = (editIsCompleted === true) ? {	"isCompleted" : todo.isCompleted } :{	"task" : todo.task };
    return this.http.put(url,update, {headers: headers})
      .map(res => res.json());
  }

  //delete todo
  deleteTodo(id) {
    return this.http.delete('https://todoapp-ang2.herokuapp.com/todo-api/todo/' + id)
      .map(res => res.json());
  }
}