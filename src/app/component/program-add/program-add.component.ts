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

  artists: Artist[];

  constructor(private concertService: ConcertService,
              private artistService: ArtistService,
              private router: Router,
              private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.artistService.getAllArtist().subscribe(value => {
        this.artists = value
      },
      error => {
        console.error(error);
        this.loadingService.hideLoading();
      })
  }

  addConcert(form: NgForm) {
    this.loadingService.showLoading();
    this.formSubmitted = true;

    if (form.invalid) {
      return;
    }

    this.concertService.addConcert(this.concert).subscribe(() => {
        this.loadingService.hideLoading();
        Swal.fire('Le concert a bien été créé. Retour au programme');
        this.router.navigate(['/program']);
      },
      error => {
        console.error(error);
        this.loadingService.hideLoading();
      })
  }
}
