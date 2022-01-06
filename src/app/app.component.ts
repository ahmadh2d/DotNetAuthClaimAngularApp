import { Component } from '@angular/core';
import { Constants } from './Helpers/constants';

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
}
