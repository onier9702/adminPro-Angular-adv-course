import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

import { RegisterFormInterface } from '../../interfaces/register-form.interface';
import { LoginFormInterface } from '../../interfaces/login-form.interface';
import { User } from '../../models/user.model';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private privateUrl: string = environment.base_url;
  public auth2: any;
  public currentUser!: User;

  get getToken(): string {
    return localStorage.getItem('token') || '';
  }

  get getUID(): string {
    return this.currentUser.uid || '';
  }

  constructor( 
    private http: HttpClient,
    private router: Router
  ) {}

  googleInit() {

    return new Promise<void>(  resolve => {

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '654466804219-svlvgnd67dk18b1gk6vqilub50sfn5cr.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });

        resolve();
      })

    } )


  }

  logout() {
    localStorage.removeItem('token');
  }


  revalidateToken(): Observable<boolean> {
    const url = `${this.privateUrl}/login/renew`;
    const token = this.getToken;
    const headers = new HttpHeaders()
      .set('x-token', token );

    return this.http.get(url, { headers })
      .pipe(
        map( (resp: any) => {
          console.log(resp);
          this.currentUser = new User(resp.user);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError(err => of(false))
      )
  }


  saveUser( formData: RegisterFormInterface ): Observable<any> {
    const url = `${this.privateUrl}/users`;
    return this.http.post<any>( url, formData )
      .pipe(
        map( resp => {
          localStorage.setItem( 'token', resp.token );
          localStorage.setItem( 'current_user', JSON.stringify( resp.user ) );
          localStorage.setItem( 'uid', resp.user.uid );
          return resp;
        } ),
        catchError( err => of( err ) )
      );

  };


  loginUser( formData: LoginFormInterface, remember: boolean = false ): Observable<any> {
    const url = `${this.privateUrl}/login`;
    return this.http.post<any>( url, formData )
      .pipe(
        map( resp => {
          localStorage.setItem( 'token', resp.token );
          localStorage.setItem( 'current_user', JSON.stringify( resp.user ) );
          localStorage.setItem( 'uid', resp.user.uid );
          if ( remember ) {
            localStorage.setItem('email', resp.user.email);
          } else {
            localStorage.removeItem('email');
          }
          return resp;
        } ),
        catchError( err => of( err ) )
      );

  };


  loginGoogle( token: string ): Observable<any> {
    const url = `${this.privateUrl}/login/google`;
    return this.http.post<any>( url, {token} )
      .pipe(
        map( resp => {
          localStorage.setItem( 'token', resp.token );
          localStorage.setItem( 'current_user', JSON.stringify( resp.user ) );
          localStorage.setItem( 'uid', resp.user.uid );
          return resp;
        } ),
        catchError( err => of( err ) )
      );

  }

  updateUserProfile( data: any ) {
    const url = `${this.privateUrl}/users/${this.getUID}`;
    const token = this.getToken;
    const headers = new HttpHeaders()
      .set('x-token', token );
    return this.http.put( url, data, {headers} )
      .pipe(
        map( resp => resp ),
        catchError( err => of(err))
      );

  }

}
