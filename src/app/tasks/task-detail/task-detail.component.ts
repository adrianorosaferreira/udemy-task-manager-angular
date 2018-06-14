// Removido o Input
// import { Component, Input, OnInit } from '@angular/core';
import { Component, OnInit, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit, AfterViewInit {
    public reactiveTaskForm: FormGroup;
    // Este @Input foi removido pois agora o Tesk Detail é indempendente
    // Este @Input permite que um outro component possa acessar esta propriedade
    // @Input() public task: Task;
    public task: Task;
    public taskDoneOptions: Array<any> = [
      { value: false, text: 'Pendente'},
      { value: true, text: 'Feita'}
    ];

    public constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private location: Location
    ) {
      this.reactiveTaskForm = new FormGroup({
        title: new FormControl(null),
        deadline: new FormControl(null),
        done: new FormControl(null),
        description: new FormControl(null)
      });
    }

    public ngOnInit() {
      this.task = new Task(null, null);
      // Sempre quando utilizo um Observable eu preciso usar um subscrib
      this.route.params
          // o '+' converte para mumero
          .switchMap((params: Params) => this.taskService.getById(+params['id']))
          .subscribe(
            task => this.setTask(task),
            error => alert('Ocorreu um erro no Servidor, tente mais tarde.')
          );
    }

    public setTask(task: Task): void {
      this.task = task;
      this.reactiveTaskForm.patchValue(task);
      // Duas formas de popular dados no html
      // setValue = Todos os dados passados tem que ser do formModel 
      //            e não pode faltar nenhum
/*       let formModel = {
        title: task.title || null,
        description: task.description || null,
        done: task.done || null,
        deadline: task.deadline || null
      };

      this.reactiveTaskForm.setValue(formModel); */

      // patchValue = não precisar passar todos os campos do formModel
      //              e não precisa ser exatamente um campo existente do formModel
/*       let formModel = {
        title: task.title || null,
        description: task.description || null,
        nameQualquer: 'nome qualquer'
      };
      this.reactiveTaskForm.patchValue(formModel); */
    
    }

    public ngAfterViewInit() {
      $('#deadline').datetimepicker({
        'sideBySide': true,
        'locale': 'pt-br'
      }).on('dp.change', () => this.reactiveTaskForm.get('deadline').setValue($('#deadline').val()));
    }

    public goBack() {
        this.location.back();
    }

    public update() {
      this.taskService.update(this.task)
        .subscribe(
          () => {
            alert('Tarefa atualizada com sucesso!')
            this.goBack();
          },
          () => alert('Ocorreu um erro no Servidor, tente mais tarde.')
        );
    }

    public showFieldError(field): boolean {
      return field.invalid && (field.touched || field.dirty);
    }
}
