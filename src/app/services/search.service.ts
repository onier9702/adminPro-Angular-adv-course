import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Types } from '../interfaces/general-types.interface';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private privateUrl: string = environment.base_url;

  get getToken(): string {
    return localStorage.getItem('token') || '';
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
  ) {}

  searchByCollection( collection: Types, term: string) {
    const url = `${this.privateUrl}/all/${collection}/${term}`;
    return this.http.get<any>( url, this.getHeaders )
      .pipe(
        map( (resp: any) => {
          if ( collection === Types.USERS ) {
            return resp.result.map( (user: any) => new User(user) )
          } else {
            return resp.result;
          }
        })
      );
  }

}
