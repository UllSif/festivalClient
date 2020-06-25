import {Component, OnInit} from '@angular/core';
import {ConcertService} from "../../service/concert.service";
import {Router} from "@angular/router";
import {Concert} from "../../entity/concert.entity";
import {NgForm} from "@angular/forms";
import {ArtistService} from "../../service/artist.service";
import {Artist} from "../../entity/artist.entity";

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
              private router: Router) {
  }

  ngOnInit(): void {
    this.artistService.getAllArtist().subscribe(value =>
    this.artists = value)
  }

  addConcert(form: NgForm) {
    this.formSubmitted = true;

    if (form.invalid) {
      return;
    }

    this.concertService.addConcert(this.concert).subscribe(() => {
      this.router.navigate(['/program'])
    })
  }
}
