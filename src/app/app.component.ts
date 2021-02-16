import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: any[] = [];

  public title: String = 'Minhas Tarefas';
  /**
   *
   */
  constructor() {
    this.todos.push('pos 1');    
    this.todos.push('pos 2');    
    this.todos.push('pos 3');    
  }
}
