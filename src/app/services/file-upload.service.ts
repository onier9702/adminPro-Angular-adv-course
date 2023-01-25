import { Injectable } from '@angular/core';
import { UserService } from '../auth/services/user.service';
import { environment } from '../../environments/environment';
import { Types } from '../interfaces/general-types.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  get getToken(): string {
    return localStorage.getItem('token') || '';
  }

  constructor( private userService: UserService ) { }

  async updateFileUpload(file: File, type: Types, id: string) {

    const url = `${base_url}/upload/${type}/${id}`;

    try {

      // via fetchApi -> native from JavaScript
      const formData = new FormData();
      formData.append('file', file);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': this.getToken
        },
        body: formData

      } );      

      return await resp.json();

      
    } catch (error: any) {
      console.log(error);
      return {ok: false, msg: error.msg};
    }

  }

}
