import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../entity/user.entity";
import {LoadingService} from "../../service/loading.service";

@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.scss']
})
export class VolunteerListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService,
              private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingService.showLoading();
    this.userService.getUserList().subscribe(value => {
      this.users = value;
      this.loadingService.hideLoading();
    },
      error => {
        console.error(error);
        this.loadingService.hideLoading();
      });
  }

  get loading() {
    return this.loadingService.isLoading();
  }

}
