import { Component, OnInit } from '@angular/core';
import {SecurityService} from "../../service/security.service";
import {Router} from "@angular/router";
import {User} from "../../entity/user.entity";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user: User;

  constructor(private securityService: SecurityService, private router: Router) { }

  ngOnInit(): void {
    this.securityService.restoreConnection();
    this.user = this.securityService.getCurrentUser();
  }

  get isConnected() {
    return this.securityService.isConnected();
  }

  logOut() {
    this.securityService.logOut();
    this.router.navigate(['/home']);
  }

}
