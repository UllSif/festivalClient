import { Component, OnInit } from '@angular/core';
import {ArtistService} from "../../service/artist.service";
import {Artist} from "../../entity/artist.entity";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {

  artists: Artist[];

  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.artistService.getAllArtist().subscribe(value => {
      this.artists = value
    })
  }

  sortArtists() {
    return this.artists.sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
}
}
