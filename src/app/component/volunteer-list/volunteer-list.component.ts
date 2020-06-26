import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../entity/user.entity";
import {LoadingService} from "../../service/loading.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.scss']
})
export class VolunteerListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService,
              private loadingService: LoadingService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadingService.showLoading();
    this.userService.getUserList().subscribe(value => {
      this.users = value;
      this.loadingService.hideLoading();
    },
      // Gestion des erreurs
      error => {
        if (error.status == 403) {
          console.error(error);
          Swal.fire("Vous ne disposez pas des accès pour visualiser la liste des bénévoles. Retour à l'accueil");
          this.router.navigate(['/home']);
          this.loadingService.hideLoading();
        } else {
          console.error(error);
          Swal.fire("Une erreur s'est produite. Retour à l'accueil");
          this.router.navigate(['/home']);
          this.loadingService.hideLoading();
        }
      });
  }

  get loading() {
    return this.loadingService.isLoading();
  }

}
