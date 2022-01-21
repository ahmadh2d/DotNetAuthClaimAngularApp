import { Component } from '@angular/core';
import { UserRoles } from './enums/UserRoles';
import { Constants } from './Helpers/constants';
import { User } from './Models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DotNetAuthClaimAngularApp';
  
  onLogOut(): void {
    localStorage.removeItem(Constants.USER_KEY);
  }

  get isUserLogin() {
    var user = localStorage.getItem(Constants.USER_KEY);
    return user && user.length > 0;
  }

  get user() : User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  }

  get isAdmin() : boolean {
    return this.user.roles.indexOf(UserRoles.ADMIN) > -1;
  }
  
  get isUser() : boolean {
    return this.user.roles.indexOf(UserRoles.USER) > -1 && !this.isAdmin;
  }
}
