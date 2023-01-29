import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Types } from '../interfaces/general-types.interface';
import { UserService } from '../auth/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal: boolean = true;
  private _base_url: string = environment.base_url;
  public type!: Types;
  public id!: string;
  public img!: string;

  public newImgWasUploaded: EventEmitter<string> = new EventEmitter();

  get hideModal() {
    return this._hideModal;
  }

  constructor( private http: HttpClient, private userService: UserService) { }

  openModal( type: Types, id: string = '', img: string | undefined ) {
    this._hideModal = false;
    this.type = type;
    this.id = id;

    if ( !img ) img = 'no-img';

    if ( img.includes('https') ) { // google photo
      this.img = img;
    } else {
      this.img = `${this._base_url}/upload/${type}/${img}`;
    }
    
  }

  closeModal() {
    this._hideModal = true;
  }
}
