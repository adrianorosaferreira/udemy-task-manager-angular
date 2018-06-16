// Removido o Input
// import { Component, Input, OnInit } from '@angular/core';
import { Component, OnInit, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { FormUtils } from '../../shared/form.utils';
import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html',
    styles: ['.form-control-feedback{ margin-right:20px }']
})

export class TaskDetailComponent implements OnInit, AfterViewInit {
    public form: FormGroup;
    // Este @Input foi removido pois agora o Tesk Detail é indempendente
    // Este @Input permite que um outro component possa acessar esta propriedade
    // @Input() public task: Task;
    public task: Task;
    public taskDoneOptions: Array<any>;
    public formUtils: FormUtils;

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
      this.form = this.formBuilder.group({
        title: [null, [ Validators.required,
                        Validators.minLength(2),
                        Validators.maxLength(50)]],
        deadline: [null, Validators.required],
        done: [null, Validators.required],
        description: [null]
      });
      this.formUtils = new FormUtils(this.form);
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
      this.form.patchValue(task);
    }

    public ngAfterViewInit() {
      $('#deadline').datetimepicker({
        'sideBySide': true,
        'locale': 'pt-br'
      }).on('dp.change', () => this.formUtils.getField('deadline').setValue($('#deadline').val()));
    }

    public goBack() {
        this.location.back();
    }

    public update() {
      this.task.title = this.formUtils.getField('title').value;
      this.task.deadline = this.formUtils.getField('deadline').value;
      this.task.done = this.formUtils.getField('done').value;
      this.task.description = this.form.get('description').value;

      this.taskService.update(this.task)
        .subscribe(
          () => {
            alert('Tarefa atualizada com sucesso!');
            this.goBack();
          },
          () => alert('Ocorreu um erro no Servidor, tente mais tarde.')
        );
    }

}
