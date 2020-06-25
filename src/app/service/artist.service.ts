import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Artist} from "../entity/artist.entity";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) {
  }

  getAllArtist(): Observable<Artist[]> {
    return this.http.get<Artist[]>(environment.apiPrefix + '/artist');
  }

  getOneArtist(id: number): Observable<Artist> {
    return this.http.get<Artist>(environment.apiPrefix + '/artist/' + id);
  }

  addArtist(artist: Artist) {
    return this.http.post(environment.apiPrefix + '/artist', artist);
  }

  editArtist(id: number, artist: Artist) {
    return this.http.put(environment.apiPrefix + '/artist/' + id, artist);
  }

  deleteArtiste(id: number) {
    return this.http.delete(environment.apiPrefix + '/artist/' + id)
  }
}
