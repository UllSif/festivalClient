import {Component, OnInit} from '@angular/core';
import {ArtistService} from "../../service/artist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Artist} from "../../entity/artist.entity";
import {ConcertService} from "../../service/concert.service";
import {SecurityService} from "../../service/security.service";
import {LoadingService} from "../../service/loading.service";
import Swal from "sweetalert2";

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
              private loadingService: LoadingService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadingService.showLoading();
    this.artistId = this.route.snapshot.paramMap.get('id');
    this.artistService.getOneArtist(this.artistId).subscribe(value => {
        this.artist = value;
        this.loadingService.hideLoading();
      },
      error => {
        if (error.status == 404) {
          console.error(error);
          Swal.fire("Cet artiste est introuvable. Retour à la liste");
          this.router.navigate(['/artist-list']);
          this.loadingService.hideLoading();
        } else {
          console.error(error);
          Swal.fire("Une erreur s'est produite. Retour à la liste.");
          this.router.navigate(['/artist-list']);
          this.loadingService.hideLoading();
        }
      });
  }

  get isConnected() {
    return this.securityService.isConnected();
  }

  get loading() {
    return this.loadingService.isLoading();
  }
}
