import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {SecurityService} from "../service/security.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private securityService: SecurityService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.securityService.isConnected()) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.securityService.getToken()
        }
      })
    }
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.securityService.logOut();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
