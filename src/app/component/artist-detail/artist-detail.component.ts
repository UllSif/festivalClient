import { Component, OnInit } from '@angular/core';
import {ArtistService} from "../../service/artist.service";
import {ActivatedRoute} from "@angular/router";
import {Artist} from "../../entity/artist.entity";
import {Concert} from "../../entity/concert.entity";
import {ConcertService} from "../../service/concert.service";

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
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.artistId = this.route.snapshot.paramMap.get('id');
    this.artistService.getOneArtist(this.artistId).subscribe(value => {
      this.artist = value;
    })
  }

}
