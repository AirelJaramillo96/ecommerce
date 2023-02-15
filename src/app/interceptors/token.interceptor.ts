import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {TokenService} from "../services/users/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
      private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      request = this.addToken(request, next);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
      const token = this.tokenService.getToken();
        if (token) {
            return request = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${token}`)
            });
        }
        return request
  }
}
