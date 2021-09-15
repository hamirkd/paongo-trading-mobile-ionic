//httpConfig.interceptor.ts
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../providers';
import { map, catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular';

import {  User as UserService } from '../providers';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(public user: User, public storage: Storage,
    public appCtrl: App,private userService:UserService) { }


  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //   const token = this.user._user?this.user._user.token:'';
  //   const token_type = this.user._user?this.user._user.token_type:'';
  //   console.log(this.user._user)
  //   // const token = '';
  //   // const token_type = '';
  //   //Authentication by setting header with token value
  //   console.log(token_type+' '+token)

  //   if (token) {
  //     request = request.clone({
  //       setHeaders: {
  //         'Authorization': 'Bearer'+' '+token
  //       }
  //     });
  //   }

  //   if (!request.headers.has('Content-Type')) {
  //     request = request.clone({
  //       setHeaders: {
  //         'content-type': 'application/json'
  //       }
  //     });
  //   }

  //   request = request.clone({
  //     headers: request.headers.set('Accept', 'application/json')
  //   });

  //   console.log(request.headers)

  //   return next.handle(request).pipe(
  //     map((event: HttpEvent<any>) => {
  //       if (event instanceof HttpResponse) {
  //         console.log('event--->>>', event);
  //       }
  //       return event;
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       console.error(error);
  //       throw error;
  //     //   return throwError(error);
  //     }));
  // }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    const token = this.user._user ? this.user._user.token : '';
    // console.log(this.user._user)
    // const token = '';
    // const token_type = '';
    //Authentication by setting header with token value
    // console.log(token_type+' '+token)


    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }


    // return next.handle(request);


    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        console.error();

        if (error.status == 401) {
          
           this.userService.logout();
          if (!localStorage.getItem("redirection")) {
            this.appCtrl.getRootNav().push('WelcomePage');
            localStorage.setItem("redirection", "ok")
          }
        }
        throw (error);
      }));
  }



}