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

  constructor(public auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requisicao = req.url.slice(0,21);
    if (requisicao === environment.apiUrl && req.url.toString() !== `${environment.apiUrl}/auth/autenticate` && req.url.toString() !== `${environment.apiUrl}/auth/register`) {
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