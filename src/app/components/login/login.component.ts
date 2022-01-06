import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/Helpers/constants';
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
      next: (data : any) => {
        if (data.responseStatusCode === 1) {
          localStorage.setItem(Constants.USER_KEY, JSON.stringify(data.dataSet));
          this.router.navigate(["/user-management"]);
        }

        console.log(data);
      },
      error: error => {
        console.error(error.responseMessage);
      }
    });
  }

}
