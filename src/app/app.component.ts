import { Component } from '@angular/core';

import { TokenService } from './shared/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Gerenciador de Tarefas!';

  public constructor(private tokenService: TokenService) {
    this.tokenService.init({
      apiBase: 'http://api.task-manager.test:3000',
      globalOptions: {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/vnd.taskmanager.v2'
        }
      }
    });
  }
}
