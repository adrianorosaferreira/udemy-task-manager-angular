import { Component, OnInit } from '@angular/core';

import { Task } from './shared/task.model';
import { TaskService } from './shared/task.service';

@Component({
    selector: 'tasks',
    templateUrl: './tasks.component.html',
    providers: [ TaskService ]
})
export class TasksComponent implements OnInit {
    public tasks: Array<Task>;
    public selectedTask: Task;

    public constructor(private taskService: TaskService) { }

    public ngOnInit() {
        // Função original
        /* this.taskService.getTasks()
            .then(function(tasks) {
                console.log('Requisição efetuada com sucesso!');
                console.log(tasks);
                // this.tasks = tasks;
            })
            .catch(function(error_msg) {
                console.log(error_msg);
            }); */
        // ... com Arrow functions
        this.taskService.getTasks()
            .then((tasks) => this.tasks = tasks)
            // Quando tem uma unica linha remova as chaves '{}'
            .catch((error_msg) => console.log(error_msg));
    }

    public onSelect(task: Task): void {
        this.selectedTask = task;
    }
}

