import { Component, OnInit } from '@angular/core';

import { Task } from './shared/task.model';
import { TaskService } from './shared/task.service';

@Component({
    selector: 'tasks',
    templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
    public tasks: Array<Task>;
    public newTask: Task;

    public constructor(private taskService: TaskService) {
      this.newTask = new Task(null, '');
    }

    public ngOnInit() {
        this.taskService.getAll()
            .subscribe(
              tasks => this.tasks = tasks,
              error => alert('Ocorreu um erro no Servidor, tente mais tarde')
            );
    }

    public create() {
      this.newTask.title = this.newTask.title.trim();

      if (!this.newTask.title) {
        alert('A tarefa deve ter um título');
      } else {
        this.taskService.create(this.newTask)
          .subscribe(
            (task) => {
              this.tasks.push(task);
              this.newTask = new Task(null, '');
            },
            () => alert('Ocorreu um erro no Servidor, tente mais tarde')
          );
      }
    }

    public delete(task: Task) {
      if ( confirm(`Deseja realmente excluir a tarefa "${task.title}"`) ) {
        this.taskService.delete(task.id)
          .subscribe(
            () => this.tasks = this.tasks.filter( t => t !== task ),
            () => alert('Ocorreu um erro no Servidor, tente mais tarde')
          );
      }
    }
}

