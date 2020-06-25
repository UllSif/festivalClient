import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {SecurityService} from "../service/security.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private securityService: SecurityService) {
  }

  canActivate() {
    return this.securityService.isConnected();
  }

}
