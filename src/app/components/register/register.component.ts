import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const fullName: string = this.registerForm.controls["fullName"].value;
    const email: string = this.registerForm.controls["email"].value;
    const password: string = this.registerForm.controls["password"].value;

    this.userService.register(fullName, email, password).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.error(error.responseMessage);
      }
    });
  }
}
