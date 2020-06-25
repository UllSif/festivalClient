import {Component, OnInit} from '@angular/core';
import {Artist} from "../../entity/artist.entity";
import {ArtistService} from "../../service/artist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.scss']
})
export class ArtistEditComponent implements OnInit {

  artist: Artist;
  artistId;

  formSubmitted = false;

  constructor(private artistService: ArtistService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.artistId = this.route.snapshot.paramMap.get('id');
    this.artistService.getOneArtist(this.artistId).subscribe(value => {
      this.artist = value;
    })
  }

  editArtist(form: NgForm) {
    this.formSubmitted = true;

    if (form.invalid) {
      return;
    }

    this.artistService.addArtist(this.artist).subscribe(() => {
      this.router.navigate(['/artist-list']);
    })
  }

  deleteArtist() {
    this.artistService.deleteArtiste(this.artistId).subscribe(() => {
      this.router.navigate(['/artist-list']);
    })
  }
}
