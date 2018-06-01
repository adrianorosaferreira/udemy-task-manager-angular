import { Injectable } from '@angular/core';

import { Task } from './task.model';

const TASKS: Array<Task> = [
    { id: 1, title: 'Fazer tarefa 1' },
    { id: 2, title: 'Fazer tarefa 2' },
    { id: 3, title: 'Fazer tarefa 3' },
    { id: 4, title: 'Fazer tarefa 4' },
    { id: 5, title: 'Fazer tarefa 5' },
    { id: 6, title: 'Fazer tarefa 6' },
    { id: 7, title: 'Fazer tarefa 7' }
];

@Injectable()

export class TaskService {

    public getTasks(): Promise<Task[]> {
        const promise = new Promise((resolve, reject) => {
            if (TASKS.length > 0) {
                // Simulando um atraso na requisição para poder demonstrar que
                // a aplicação está sendo acarregada de forma assincrona
                setTimeout(function() {
                    resolve(TASKS);
                }, 3000);
            } else {
                const error_msg = 'Não há tarefas';
                reject(error_msg);
            }
        });

        return promise;
    }

}