import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

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


  loadAllDoctors() {

    const url = `${ base_url }/doctors`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: any) => resp.doctors )
              );
  }

  getDoctorByID( id: string ) {

    const url = `${ base_url }/doctors/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: any) => resp.doctor )
              );
  }

  createDoctor( doctor: { name: string, hospital: string } ) {

    const url = `${ base_url }/doctors`;
    return this.http.post( url, doctor, this.headers );
  }
  
  updateDoctor( doctor: Doctor  ) {

    const url = `${ base_url }/doctors/${ doctor.id }`;
    return this.http.put( url, doctor, this.headers );
  }

  removeDoctor( id: string = '' ) {

    const url = `${ base_url }/doctors/${ id }`;
    return this.http.delete( url, this.headers );
  }
}
