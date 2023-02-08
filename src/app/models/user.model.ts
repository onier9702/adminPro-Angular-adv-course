import { environment } from '../../environments/environment';
import { Roles } from '../interfaces/roles.interface';

const base_url = environment.base_url;

export class User {

    public name: string;
    public email: string;
    public password?: string;
    public google?: boolean;
    public role?: Roles;
    public img?: string;
    public uid?: string;

    get urlImage() {

        // image saved by google user that includes image on internet
        if (this.img?.includes( 'https' )) {
            return this.img;
        }

        // image saved on local backend (static)
        if ( this.img ) {
            return `${base_url}/upload/user/${this.img}`;
        } else {
            // it is so backend return image by default( no image downloaded from internet)
            return `${base_url}/upload/user/no-image`; 
        }
    }

    constructor( user?: User ) {

        if ( user ) {
            this.name = user['name'];
            this.email = user['email'];
            this.password = '';
            this.google = user['google'];
            this.role = user['role'];
            if ( user.img ) {
                this.img = user['img'];
            } else {
                this.img = '';
            }
            this.uid = user['uid'];

        } else {
            this.name = '';
            this.email = '';
            this.password = undefined;
            this.google = undefined;
            this.role = undefined;
            this.img = '';
            this.uid = undefined;
        }    

    }

    printUserTest() {
        console.log('email: ', this.email); 
    }



};