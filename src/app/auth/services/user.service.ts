import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

import { RegisterFormInterface } from '../../interfaces/register-form.interface';
import { LoginFormInterface } from '../../interfaces/login-form.interface';
import { User } from '../../models/user.model';
import { LoadedUsers } from '../../interfaces/loaded-users.interface';
import { SidebarService } from '../../shared/services/sidebar.service';
import { Roles } from '../../interfaces/roles.interface';

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

  get getRoles(): Roles {
    return this.currentUser.role || Roles.USER_ROLE;
  }

  get getHeaders(): object {
    return {
      headers: {
        'x-token': this.getToken
      }
    }
  }

  constructor( 
    private http: HttpClient,
    private router: Router,
    private sidebarService: SidebarService,
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
          this.sidebarService.menu = resp.menu;
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
          this.sidebarService.menu = resp.menu;
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
          this.sidebarService.menu = resp.menu;
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
          this.sidebarService.menu = resp.menu;
          localStorage.setItem( 'token', resp.token );
          localStorage.setItem( 'current_user', JSON.stringify( resp.user ) );
          localStorage.setItem( 'uid', resp.user.uid );
          return resp;
        } ),
        catchError( err => of( err ) )
      );

  }

  updateUserProfile( data: any ) {
    const dataToBackend = {
      ...data,
      role: this.currentUser.role // to avoid change role who are not admin
    };

    const url = `${this.privateUrl}/users/${this.getUID}`;
    
    return this.http.put( url, dataToBackend, this.getHeaders )
      .pipe(
        map( resp => resp ),
        catchError( err => {
          if ( err.error.msg ) {
            return of(err.error);
          } else {
            return of(err.error.errors.name);
          }
        } )
      );

  }

  loadAllUsersFromDB( since: number = 0, limit: number = 2 ): Observable<LoadedUsers> {
    const url = `${this.privateUrl}/users/?since=${since}&limit=${limit}`;
    return this.http.get<LoadedUsers>( url, this.getHeaders )
      .pipe(
        map( resp => {
          // here we need to instance each user came from DB to can show their Image
          const instancedUsers = resp.users.map( user => new User(user) );
          return {
            ok: true,
            count: resp.count,
            users: instancedUsers
          };
        } ),
        catchError( err => of(err))
      );
  }

  deleteOneUser( uid: string ) {
    const url = `${this.privateUrl}/users/${uid}`;
    return this.http.delete( url, this.getHeaders )
      .pipe(
        map( resp => resp ),
        catchError( err => of(err))
      );
  }

  changeRole(user: User) {
    // Just update role field
    const dataToBackend = {
      email: user.email,
      role: user.role
    };

    const url = `${this.privateUrl}/users/${user.uid}`;
    return this.http.put( url, dataToBackend, this.getHeaders )
      .pipe(
        map( resp => resp ),
        catchError( err => of(err))
      );
  }

}
