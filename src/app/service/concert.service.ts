import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Concert} from "../entity/concert.entity";

@Injectable({
  providedIn: 'root'
})
export class ConcertService {

  constructor(private http: HttpClient) {
  }

  getAllConcert(): Observable<Concert[]> {
    return this.http.get<Concert[]>(environment.apiPrefix + '/concert');
  }

  getOneConcert(id: number): Observable<Concert> {
    return this.http.get<Concert>(environment.apiPrefix + '/concert/' + id);
  }

  addConcert(concert: Concert) {
    return this.http.post(environment.apiPrefix + '/concert', concert);
  }

  editConcert(id: number, concert: Concert) {
    return this.http.put(environment.apiPrefix + '/concert/' + id, concert);
  }

  deleteConcert(id: number) {
    return this.http.delete(environment.apiPrefix + '/concert/' + id);
  }
}
