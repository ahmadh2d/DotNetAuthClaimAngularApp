import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRoles } from 'src/app/enums/UserRoles';
import { Constants } from 'src/app/Helpers/constants';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const email: string = this.loginForm.controls["email"].value;
    const password: string = this.loginForm.controls["password"].value;

    this.userService.login(email, password).subscribe({
      next: (data: any) => {
        if (data.responseStatusCode === 1) {
          var user = data.dataSet as User;
          localStorage.setItem(Constants.USER_KEY, JSON.stringify(user));
          
          if (user.roles.indexOf(UserRoles.ADMIN) > -1)
            this.router.navigate(["/all-users-management"]);
          else if (user.roles.indexOf(UserRoles.USER) > -1)
            this.router.navigate(["/users-management"]);
        }

        console.log(data);
      },
      error: error => {
        console.error(error.responseMessage);
      }
    });
  }

}
