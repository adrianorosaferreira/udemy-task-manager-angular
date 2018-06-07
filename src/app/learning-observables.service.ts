import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

// Tratando erros
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

@Injectable()

export class LearningObservables {
  public constructor(private http: Http) {
    // Criando objeto observador
    const observer = {
      next: function(newData){
        console.log('Chamou o método NEXT e passou o parametro "newData" => ', newData);
      },
      error: function(errorData){
        console.log('Chamou o método ERROR e passou o parametro "errorData" => ', errorData);
      },
      complete: function(){
        console.log('Chamou o método COMPLETE e encerrou');
      }
    };

    // Criando um objeto observado e passando o observador como parametro
    // this.http.get('api/tasks')
    //   .subscribe(observer);

    // Criando um objeto observado e criando um observador como parametro
    // this.http.get('api/tasks')
    //   .subscribe({
    //     next: function(newData){
    //       console.log('Chamou o método NEXT e passou o parametro "newData" => ', newData);
    //     },
    //     error: function(errorData){
    //       console.log('Chamou o método ERROR e passou o parametro "errorData" => ', errorData);
    //     },
    //     complete: function(){
    //       console.log('Chamou o método COMPLETE e encerrou');
    //     }
    //   });

    // Passando os metodos (next, error, complete) diretamente como parametro (usando arrow functions)
    // Já com traqtamento de erros
    this.http.get('api/tasssks')
      .catch(this.handleErrors)
      .subscribe(
        (newData) => console.log('Chamou o método NEXT e passou o parametro "newData" => ', newData),
        (error) => alert('Ocorreu um erro np srvidor , por favor tente mais tarde'),
        () => console.log('Chamou o método COMPLETE e encerrou')
      );
  }

  public handleErrors(error: Response) {
    console.log('Salvando erro em banco de dados para o desenvolvedor => ', error);
    return Observable.throw(error);
  }
}
