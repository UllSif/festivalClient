import {Component, OnInit} from '@angular/core';
import {ConcertService} from "../../service/concert.service";
import {Router} from "@angular/router";
import {Concert} from "../../entity/concert.entity";
import {NgForm} from "@angular/forms";
import {ArtistService} from "../../service/artist.service";
import {Artist} from "../../entity/artist.entity";
import Swal from "sweetalert2";
import {LoadingService} from "../../service/loading.service";

@Component({
  selector: 'app-program-add',
  templateUrl: './program-add.component.html',
  styleUrls: ['./program-add.component.scss']
})
export class ProgramAddComponent implements OnInit {

  concert: Concert = new Concert();
  formSubmitted = false;
  selectedTimeError = false;
  selectedDurationError = false;

  artists: Artist[];

  constructor(private concertService: ConcertService,
              private artistService: ArtistService,
              private router: Router,
              private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.artistService.getAllArtist().subscribe(value => {
        this.artists = value;
      },
      error => {
        console.error(error);
        this.loadingService.hideLoading();
      })
  }

  addConcert(form: NgForm) {
    this.loadingService.showLoading();
    this.formSubmitted = true;

    this.selectedDurationError = false;
    this.selectedTimeError = false;

    if (this.concert.time < '11:00' || this.concert.time > '23:00') {
      this.selectedTimeError = true;
    }

    if (this.concert.duration < '00:30' || this.concert.duration > '02:00') {
      this.selectedDurationError = true;
    }

    if (form.invalid || this.selectedTimeError || this.selectedDurationError) {
      this.loadingService.hideLoading();
      return;
    }

    this.concertService.addConcert(this.concert).subscribe(() => {
        this.loadingService.hideLoading();
        Swal.fire('Le concert a bien été créé. Retour au programme');
        this.router.navigate(['/program']);
      },
      error => {
        if (error.status == 403) {
          console.error(error);
          Swal.fire('Vous ne disposez pas des accès pour ajouter un concert.');
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
}
