import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = {
    name: '',
    email: '',
    phone: '',
    password: ''
  }
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createUser(): void {
    this.userService.create(this.user).subscribe(() => {
      this.userService.showMessage('User created with success!')
      this.router.navigate(['/users'])
    })

  }

  cancel(): void {
    this.router.navigate(['/users'])
  }
}
