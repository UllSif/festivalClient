import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading = true;

  constructor() {
  }

  showLoading() {
    this.loading = true;
  }

  hideLoading() {
    this.loading = false;
  }

  isLoading() {
    return this.loading;
  }
}
