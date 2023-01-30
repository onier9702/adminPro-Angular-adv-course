import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
import { Types } from '../interfaces/general-types.interface';

const base_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( img: string, type: Types): string {
    
    if ( !img ) {
        return `${ base_url }/upload/user/no-image`;
    } else if ( img.includes('https') ) {
        return img;
    } else if ( img ) {
        return `${ base_url }/upload/${ type }/${ img }`;
    } else {
        return `${ base_url }/upload/user/no-image`;
    }

  }

}
