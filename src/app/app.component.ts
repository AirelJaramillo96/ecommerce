import { Component } from '@angular/core';

import { AuthService } from "./services/users/auth.service";
import { UserService } from "./services/users/user.service";
import {CreateUserDTO, User} from "./models/user.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';

  user: User = {
    id: '',
    name: '',
    email: '',
    password: ''
  }
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  onLoaded(img: string) {
    console.log('img loaded in parent', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    let user: CreateUserDTO= {
      name: 'John Marston',
      email: 'johnmarston@gmail.com',
      password: '123456'
    }
    this.userService.create(user).subscribe((user: User) => {
      console.log('user created', user);
    })
  }

  login() {
    this.authService.login('johnmarston@gmail.com', '123456')
      .subscribe(rta => {

      this.getProfile();
    });
  }

  getProfile() {
    this.authService.profile().subscribe(rta => {
       this.user = rta;
    })
  }
}
