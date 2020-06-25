import {Component, OnInit} from '@angular/core';
import {SecurityService} from "../../service/security.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string;

  constructor(private securityService: SecurityService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.securityService.login(this.username, this.password).subscribe(() => {
        this.router.navigate(['/home'])
      },
      error => {
        this.errorMessage = 'Identifiants incorrects';
      });
  }
}
