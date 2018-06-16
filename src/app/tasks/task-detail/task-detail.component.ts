// Removido o Input
// import { Component, Input, OnInit } from '@angular/core';
import { Component, OnInit, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html',
    styles: [' .form-control-feedback{ margin-right: 20px } ']
})

export class TaskDetailComponent implements OnInit, AfterViewInit {
    public reactiveTaskForm: FormGroup;
    // Este @Input foi removido pois agora o Tesk Detail é indempendente
    // Este @Input permite que um outro component possa acessar esta propriedade
    // @Input() public task: Task;
    public task: Task;
    public taskDoneOptions: Array<any>;

    public constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private location: Location,
        private formBuilder: FormBuilder
    ) {
      this.taskDoneOptions = [
        { value: false, text: 'Pendente'},
        { value: true, text: 'Feita'}
      ];
      this.reactiveTaskForm = this.formBuilder.group({
        title: [null, [ Validators.required,
                        Validators.minLength(2),
                        Validators.maxLength(50)]],
        deadline: [null, Validators.required],
        done: [null, Validators.required],
        description: [null]
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
    }

    public ngAfterViewInit() {
      $('#deadline').datetimepicker({
        'sideBySide': true,
        'locale': 'pt-br'
      }).on('dp.change', () => this.getField('deadline').setValue($('#deadline').val()));
    }

    public goBack() {
        this.location.back();
    }

    public update() {
      this.task.title = this.getField('title').value;
      this.task.deadline = this.getField('deadline').value;
      this.task.done = this.getField('done').value;
      this.task.description = this.reactiveTaskForm.get('description').value;

      this.taskService.update(this.task)
        .subscribe(
          () => {
            alert('Tarefa atualizada com sucesso!');
            this.goBack();
          },
          () => alert('Ocorreu um erro no Servidor, tente mais tarde.')
        );
    }

    // Forms errors methods
    public fieldClassForErrorOrSuccess(fieldName: string) {
      return {
        'has-error' : this.showFieldError(fieldName),
        'has-success' : this.getField(fieldName).valid
      };
    }

    public iconClassErroOrSuccess(fieldName: string) {
      return {
        'glyphicon-ok': this.getField(fieldName).valid,
        'glyphicon-remove': this.showFieldError(fieldName)
      }
    }

    public showFieldError(fieldName: string): boolean {
      let field = this.getField(fieldName);
      return field.invalid && (field.touched || field.dirty);
    }

    public getField(fieldName: string) {
      return this.reactiveTaskForm.get(fieldName);
    }
}
