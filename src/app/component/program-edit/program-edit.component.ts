import {Component, OnInit} from '@angular/core';
import {Concert} from "../../entity/concert.entity";
import {Artist} from "../../entity/artist.entity";
import {ArtistService} from "../../service/artist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConcertService} from "../../service/concert.service";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {LoadingService} from "../../service/loading.service";

@Component({
  selector: 'app-program-edit',
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.scss']
})
export class ProgramEditComponent implements OnInit {

  concert: Concert;
  concertId;
  formSubmitted = false;

  artists: Artist[];

  constructor(private concertService: ConcertService,
              private artistService: ArtistService,
              private route: ActivatedRoute,
              private router: Router,
              private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingService.showLoading();
    this.concertId = this.route.snapshot.paramMap.get('id');
    this.concertService.getOneConcert(this.concertId).subscribe(value => {
        this.concert = value;
        this.loadingService.hideLoading();
      },
      error => {
        if (error.status == 404) {
          console.error(error);
          Swal.fire("Ce concert est introuvable. Retour au programme.");
          this.router.navigate(['/program']);
          this.loadingService.hideLoading();
        } else {
          console.error(error);
          Swal.fire("Une erreur s'est produite. Retour au programme.");
          this.router.navigate(['/program']);
          this.loadingService.hideLoading();
        }
      });

    this.artistService.getAllArtist().subscribe(value =>
      this.artists = value);
  }

  editConcert(form: NgForm) {
    this.loadingService.showLoading();
    this.formSubmitted = true;

    if (form.invalid) {
      return;
    }

    this.concertService.editConcert(this.concertId, this.concert).subscribe(() => {
        this.loadingService.hideLoading();
        Swal.fire('Le concert a bien été modifié. Retour au programme');
        this.router.navigate(['/program']);
      },
      // Gestion des erreurs
      error => {
        if (error.status == 403) {
          console.error(error);
          Swal.fire('Vous ne disposez pas des accès pour modifier un concert.');
          this.router.navigate(['/program']);
          this.loadingService.hideLoading();
        } else {
          console.error(error);
          Swal.fire("Une erreur s'est produite. Retour au programme");
          this.router.navigate(['/program']);
          this.loadingService.hideLoading();
        }
      });
  }

  deleteConcert() {
    this.loadingService.showLoading();
    this.concertService.deleteConcert(this.concertId).subscribe(() => {
        this.loadingService.hideLoading();
        Swal.fire('Le concert a bien été supprimé. Retour au programme');
        this.router.navigate(['/program']);
      },
      // Gestion des erreurs
      error => {
        if (error.status == 403) {
          console.error(error);
          Swal.fire("Vous ne disposez pas des accès pour supprimer un concert.");
          this.router.navigate(['/program']);
          this.loadingService.hideLoading();
        } else {
          console.error(error);
          Swal.fire("Une erreur s'est produite. Retour au programme");
          this.router.navigate(['/program']);
          this.loadingService.hideLoading();
        }
      });
  }

  get loading() {
    return this.loadingService.isLoading();
  }
}
