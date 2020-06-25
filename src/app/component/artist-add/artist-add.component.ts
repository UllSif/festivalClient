import {Component, OnInit} from '@angular/core';
import {ArtistService} from "../../service/artist.service";
import {Router} from "@angular/router";
import {Artist} from "../../entity/artist.entity";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.scss']
})
export class ArtistAddComponent implements OnInit {

  artist: Artist = new Artist();

  formSubmitted = false;

  constructor(private artistService: ArtistService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  addArtist(form: NgForm) {
    this.formSubmitted = true;

    if (form.invalid) {
      return;
    }

    this.artistService.addArtist(this.artist).subscribe(() => {
      this.router.navigate(['/artist-list']);
    })
  }
}
