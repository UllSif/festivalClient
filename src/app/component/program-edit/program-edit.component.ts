import {Component, OnInit} from '@angular/core';
import {Concert} from "../../entity/concert.entity";
import {Artist} from "../../entity/artist.entity";
import {ArtistService} from "../../service/artist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConcertService} from "../../service/concert.service";
import {NgForm} from "@angular/forms";

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
              private router: Router) {
  }

  ngOnInit(): void {
    this.concertId = this.route.snapshot.paramMap.get('id');
    this.concertService.getOneConcert(this.concertId).subscribe(value => {
      this.concert = value;
    })
    this.artistService.getAllArtist().subscribe(value =>
      this.artists = value)
  }

  editConcert(form: NgForm) {
    this.formSubmitted = true;

    if (form.invalid) {
      return;
    }

    this.concertService.addConcert(this.concert).subscribe(() => {
      this.router.navigate(['/program']);
    })
  }

  deleteConcert() {
    this.concertService.deleteConcert(this.concertId).subscribe(() => {
      this.router.navigate(['/program']);
    })
  }

}
