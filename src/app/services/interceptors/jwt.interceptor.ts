import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requisicao = req.url.split('/');
    if (requisicao[3] !== `auth`) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        req = req.clone({
        setHeaders: {
            'Authorization': `Bearer ${user.token}`
        }
    });
    }
    return next.handle(req);
  }
}
