import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers:[Todo]
})
export class TodosComponent implements OnInit {
  todos:Todo[];
  task:string;
  params : {
        hasInput: false
  };

  constructor(private todoService : TodoService) { }

  ngOnInit() {
    this.todoService.getTodos()
      .subscribe(todos => 
      this.todos = todos);
  };

  onEditClick = todo => {
      //console.log("edit click");
      todo.isEditing = true;
      todo.updatedValue = todo.task;
  };

  onDeleteClick = todo => {
      this.todoService.deleteTodo(todo._id).subscribe(todos=>{
        //console.log(success);
        this.todos=todos;
      }, error=>{
        console.log("Error occured at on save click method", error);
      });
  };
  updateTask = ($event,todo) =>{
    if($event !== "" && $event!==undefined && $event!==null)
      todo.task = $event;
  }
  onSaveClick = todo => {
      this.todoService.updateTodo(todo,false).subscribe(todos=>{
        //console.log(success);
        this.todos=todos;
      }, error=>{
        console.log("Error occured at on save click method", error);
      });
  };

  onCancelClick = todo => {
      todo.isEditing = false;
  };

  onCompletedTask = (todo) => {
     todo.isCompleted = ! todo.isCompleted;
     this.todoService.updateTodo(todo,true).subscribe(todos=>{
        //console.log(success);
        this.todos=todos;
      }, error=>{
        console.log("Error occured at on save click method", error);
      });
  }

  onAddClick = () => {
    if(this.task != undefined && this.task != "" && this.task != null){
      var newTodo={
        "isCompleted":false,
        "task":this.task,
        "isEditing":false
      }
      this.todoService.addTodo(newTodo).subscribe(todos=>{
        //console.log(todos);
        this.todos=todos;
        this.task ="";
      }, error=>{
        console.log("Error occured at on add click method", error);
      });
    }
  };
}
