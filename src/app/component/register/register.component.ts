import {Component, OnInit} from '@angular/core';
import {User} from "../../entity/user.entity";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import Swal from 'sweetalert2';
import {LoadingService} from "../../service/loading.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  formSubmitted = false;

  constructor(private userService: UserService,
              private router: Router,
              private loadingService: LoadingService) {
  }

  ngOnInit(): void {
  }

  register(form: NgForm) {
    this.formSubmitted = true;

    if (form.invalid) {
      return;
    }

    this.userService.addUser(this.user).subscribe(() => {
        Swal.fire('Votre compte a bien été créé. Veuillez vous connecter');
        this.router.navigate(['/login']);
      },
      error => {
        console.error(error);
        Swal.fire('Une erreur est survenue. Veuillez recommencer');
        this.loadingService.hideLoading();
      });
  }
}
