import {Component, OnInit} from '@angular/core';
import {ArtistService} from "../../service/artist.service";
import {Artist} from "../../entity/artist.entity";
import {SecurityService} from "../../service/security.service";
import {LoadingService} from "../../service/loading.service";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {

  artists: Artist[];

  constructor(private artistService: ArtistService,
              private securityService: SecurityService,
              private loadingService:LoadingService) {
  }

  ngOnInit(): void {
    this.loadingService.showLoading();
    this.artistService.getAllArtist().subscribe(value => {
      this.artists = value;
      this.loadingService.hideLoading();
    },
      error => {
        console.error(error);
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
