import {Component, OnInit} from '@angular/core';
import {SecurityService} from "../../service/security.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {LoadingService} from "../../service/loading.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string;
  formSubmitted = false;

  constructor(private securityService: SecurityService,
              private router: Router,
              private loadingService: LoadingService) {
  }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    this.loadingService.showLoading();
    this.formSubmitted = true;

    if (form.invalid) {
      return;
    }

    this.securityService.login(this.username, this.password).subscribe(() => {
      this.loadingService.hideLoading();
        this.router.navigate(['/home']);
      },
      error => {
        this.errorMessage = 'Identifiants incorrects';
          this.loadingService.hideLoading();
      });
  }
}
