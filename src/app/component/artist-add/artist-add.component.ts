import {Component, OnInit} from '@angular/core';
import {ArtistService} from "../../service/artist.service";
import {Router} from "@angular/router";
import {Artist} from "../../entity/artist.entity";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {LoadingService} from "../../service/loading.service";

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.scss']
})
export class ArtistAddComponent implements OnInit {

  artist: Artist = new Artist();
  formSubmitted = false;

  constructor(private artistService: ArtistService,
              private router: Router,
              private loadingService: LoadingService) {
  }

  ngOnInit(): void {
  }

  addArtist(form: NgForm) {
    this.loadingService.showLoading();
    this.formSubmitted = true;

    if (form.invalid) {
      return;
    }

    this.artistService.addArtist(this.artist).subscribe(() => {
      this.loadingService.hideLoading();
      Swal.fire("L'artiste a bien été ajouté. Retour à la liste");
      this.router.navigate(['/artist-list']);
    },
      error => {
        console.error(error);
        this.loadingService.hideLoading();
      });
  }
}
