import {Component, OnInit} from '@angular/core';
import {ArtistService} from "../../service/artist.service";
import {ActivatedRoute} from "@angular/router";
import {Artist} from "../../entity/artist.entity";
import {ConcertService} from "../../service/concert.service";
import {SecurityService} from "../../service/security.service";
import {LoadingService} from "../../service/loading.service";

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {

  artist: Artist;
  artistId;

  constructor(private artistService: ArtistService,
              private concertService: ConcertService,
              private securityService: SecurityService,
              private route: ActivatedRoute,
              private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingService.showLoading();
    this.artistId = this.route.snapshot.paramMap.get('id');
    this.artistService.getOneArtist(this.artistId).subscribe(value => {
        this.artist = value;
        this.loadingService.hideLoading();
      },
      error => {
        console.error(error);
        this.loadingService.hideLoading();
      });
  }

  get isConnected() {
    return this.securityService.isConnected();
  }

  get loading() {
    return this.loadingService.isLoading();
  }
}
