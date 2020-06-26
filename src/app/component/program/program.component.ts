import {Component, OnInit} from '@angular/core';
import {ConcertService} from "../../service/concert.service";
import {Concert} from "../../entity/concert.entity";
import {SecurityService} from "../../service/security.service";
import {LoadingService} from "../../service/loading.service";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  concerts: Concert[];

  constructor(private concertService: ConcertService,
              private securityService: SecurityService,
              private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingService.showLoading();
    this.concertService.getAllConcert().subscribe(value => {
      this.concerts = value;
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

  //Méthode pour afficher les concert du premier jour par heures, ex: 15h - 21h
  getConcertFirstDay(concert) {
    return this.concerts.filter(concert => concert.date === '2020-06-29').sort((a, b) => {
      return a.time.localeCompare(b.time);
    })
  }

  getConcertSecondDay(concert) {
    return this.concerts.filter(concert => concert.date === '2020-06-30').sort((a, b) => {
      return a.time.localeCompare(b.time);
    })
  }

  get loading() {
    return this.loadingService.isLoading();
  }
}
