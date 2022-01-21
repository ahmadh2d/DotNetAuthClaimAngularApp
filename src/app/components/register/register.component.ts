import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/Models/Role';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  roleList: Role[] = [];

  public registerForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getRoles();
  }

  onSubmit(): void {
    const fullName: string = this.registerForm.controls["fullName"].value;
    const email: string = this.registerForm.controls["email"].value;
    const password: string = this.registerForm.controls["password"].value;
    const roles: string[] = this.roleList.filter(x => x.isSelected).map(x => x.roleName);

    this.userService.register(fullName, email, password, roles).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(["/login"]);
      },
      error: error => {
        console.error(error.responseMessage);
      }
    });
  }

  getRoles() {
    this.userService.getRoles().subscribe({
      next: roles => this.roleList = roles,
      error: () => console.error("Failed! Roles not loaded!")
    });
  }

  onChangeRole(role: Role) {
    this.roleList.forEach(r => { if (r.roleName == role.roleName) r.isSelected = !role.isSelected; });
  }

  get isRoleSelected() {
    return this.roleList.filter(x => x.isSelected).length > 0;
  }
}
