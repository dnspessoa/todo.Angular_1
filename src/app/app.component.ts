import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public mode = 'list';
  
  public form: FormGroup;

  public todos: Todo[] = [];

  public title: String = 'Minhas Tarefas';
  /**
   *
   */
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    // this.todos.push(new Todo(1, 'Tarefa 1', false));    
    // this.todos.push(new Todo(2, 'Tarefa 2', false));    
    // this.todos.push(new Todo(3, 'Tarefa 3', true));  
    
    //Recupera os itens do local storage
    this.load();
  }

  add(){
    //this.form.value => {title: 'titulo'}
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear()
  {
    this.form.reset();
  }

  remove(todo: Todo){
      const index = this.todos.indexOf(todo);
      if (index !== -1) {
        this.todos.splice(index, 1);
      }

      this.save();
  }

  markAsDone(todo: Todo){
    todo.done = true;

    this.save();
  }

  markAsUnDone(todo: Todo){
    todo.done = false;

    this.save();
  }

  save () {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load() {
    const data = localStorage.getItem('todos');
    const itens = JSON.parse(data);
    if (itens) {
      this.todos = itens;
    }
    else
    {
      this.todos = [];
    }
    
  }

  changeMode(mode: string){
    this.mode = mode;
  }
}