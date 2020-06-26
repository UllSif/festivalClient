import {Component, OnInit} from '@angular/core';
import {ArtistService} from "../../service/artist.service";
import {Artist} from "../../entity/artist.entity";
import {SecurityService} from "../../service/security.service";
import {LoadingService} from "../../service/loading.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {

  artists: Artist[];

  constructor(private artistService: ArtistService,
              private securityService: SecurityService,
              private loadingService:LoadingService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadingService.showLoading();
    this.artistService.getAllArtist().subscribe(value => {
      this.artists = value;
      this.loadingService.hideLoading();
    },
      error => {
        console.error(error);
        Swal.fire("Une erreur est survenue. Retour à l'accueil");
        this.router.navigate(['/home']);
        this.loadingService.hideLoading();
      });
  }

  sortArtists() {
    return this.artists.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  get isConnected() {
    return this.securityService.isConnected();
  }

  get loading() {
    return this.loadingService.isLoading();
  }
}
