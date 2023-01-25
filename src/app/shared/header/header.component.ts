import { Component, OnInit } from '@angular/core';
import { UserService } from '../../auth/services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public user: User;

  constructor( private userService: UserService ) {
    // GOOOOOOD: models user class is call through user service 
    // who has currentUser property of Type User model
    this.user = userService.currentUser;
  }

  ngOnInit(): void {

  }

  callLogout() {
    this.userService.logout();
  }

}
