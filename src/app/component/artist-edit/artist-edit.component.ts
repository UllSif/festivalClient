import {Component, OnInit} from '@angular/core';
import {Artist} from "../../entity/artist.entity";
import {ArtistService} from "../../service/artist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {LoadingService} from "../../service/loading.service";

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
              private router: Router,
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


  editArtist(form: NgForm) {
    this.loadingService.showLoading();
    this.formSubmitted = true;

    if (form.invalid) {
      return;
    }

    this.artistService.editArtist(this.artistId, this.artist).subscribe(() => {
        this.loadingService.hideLoading();
        Swal.fire("L'artiste a bien été modifié. Retour à la liste");
        this.router.navigate(['/artist-list']);
      },
      // Gestion d'erreur
      error => {
        if (error.status == 403) {
          console.error(error);
          Swal.fire('Vous ne disposez pas des accès pour modifier un artiste.');
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

  deleteArtist() {
    this.loadingService.showLoading();
    this.artistService.deleteArtiste(this.artistId).subscribe(() => {
        this.loadingService.hideLoading();
        Swal.fire("L'artiste a bien été supprimé. Retour à la liste");
        this.router.navigate(['/artist-list']);
      },
      // Gestion d'erreur
      error => {
        if (error.status == 403) {
          console.error(error);
          Swal.fire('Vous ne disposez pas des accès pour supprimer un artiste.');
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

  get loading() {
    return this.loadingService.isLoading();
  }
}
