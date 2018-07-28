import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';

import { User } from './user.model';

@Injectable()

export class AuthService {
    public constructor(private tokenService: Angular2TokenService) { }

    public signUp(user: User) {
        // call angular2-token SignUp method here!
        // returns a Observable<Response>
    }

    public signIn(uid: string, passworld: string) {
        // call angular2-token SignIn method here!
        // returns a Observable<Response>
    }

    public signOut() {
        // call angular2-token SignOut method here!
        // returns a Observable<Response>
    }

    public userSignedIn() {
        // call angular2-token userSignedIn method here!
        // restuns a Boolean
    }

    public handleErrors(error: Response) {
        console.log('Salvando o erro em um arquivo de log - detalhes do erro => ', error);
        return Observable.throw(error);
    }
}
