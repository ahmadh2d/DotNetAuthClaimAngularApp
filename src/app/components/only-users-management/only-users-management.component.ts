import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-only-users-management',
  templateUrl: './only-users-management.component.html',
  styleUrls: ['./only-users-management.component.scss']
})
export class OnlyUsersManagementComponent implements OnInit {
  public users:User[] = [];
  
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.getOnlyUsers();
  }

  getOnlyUsers(): void {
    this.userService.getOnlyUsers().subscribe({
      next: (userList: User[]) => {
        this.users = userList;
      },
      error: () => console.error("Failed, not able to load users data!")
    })
  }
}
