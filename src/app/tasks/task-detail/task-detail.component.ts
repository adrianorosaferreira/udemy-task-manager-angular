// Removido o Input
// import { Component, Input, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit {
    // Este @Input foi removido pois agora o Tesk Detail é indempendente
    // Este @Input permite que um outro component possa acessar esta propriedade
    // @Input() public task: Task;
    public task: Task;

    public constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    public ngOnInit() {
        // Sempre quando utilizo um Observable eu preciso usar um subscrib
        this.route.params
            .switchMap((params: Params) =>
                // o '+' converte para mumero
                this.taskService.getTask(+params['id'])
            )
            .subscribe(task => this.task = task );
    }

    public goBack() {
        this.location.back();
    }
}
