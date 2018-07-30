import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';

import { User } from './user.model';

@Injectable()

export class AuthService {
  public constructor(private tokenService: Angular2TokenService) { }

  public signUp(user: User): Observable<Response> {
    return this.tokenService.registerAccount(user as any)
      .catch(this.handleErrors);
  }

  public signIn(uid: string, password: string): Observable<Response> {
    const signInData = {
      email: uid,
      password: password
    };

    return this.tokenService.signIn(signInData as any)
      .catch(this.handleErrors);
  }

  public signOut(): Observable<Response> {
    return this.tokenService.signOut()
      .catch(this.handleErrors);
  }

  public userSignedIn(): boolean {
    return this.tokenService.userSignedIn();
  }

  public handleErrors(error: Response) {
    console.log('Salvando o erro em um arquivo de log - detalhes do erro => ', error);
    return Observable.throw(error);
  }
}
