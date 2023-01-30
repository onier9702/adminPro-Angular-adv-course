import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private _base_url = environment.base_url;

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  loadHospitals() {

    const url = `${ this._base_url }/hospital`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: any) => resp.hospitals )
              );
  }

  createHospital( name: string ) {

    const url = `${ this._base_url }/hospital`;
    return this.http.post( url, { name }, this.headers );
  }
  
  updateHospital( id: string = '', name: string  ) {

    const url = `${ this._base_url }/hospital/${ id }`;
    return this.http.put( url, { name }, this.headers );
  }

  removeHospital( id: string = '' ) {

    const url = `${ this._base_url }/hospital/${ id }`;
    return this.http.delete( url, this.headers );
  }
}
