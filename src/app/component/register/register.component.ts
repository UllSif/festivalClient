import {Component, OnInit} from '@angular/core';
import {User} from "../../entity/user.entity";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User()

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  register(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.userService.addUser(this.user).subscribe(() => {
      this.router.navigate(['/login']);
      },
      error => {
        console.error(error);
      })
  }
}
