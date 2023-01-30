
import { Hospital } from './hospital.model';

interface DoctorUser {
    id: string;
    name: string;
    img: string;
}

export class Doctor {

    public name!: string;
    public id?: string;
    public img: string;
    public user?: DoctorUser;
    public hospital?: Hospital;

    constructor( doctor?: Doctor ) {
        if ( doctor ) {
            this.name = doctor['name'];
            this.id = doctor['id'];
            this.img = doctor['img'];
            this.user = doctor['user'];
            this.hospital = doctor['hospital'];
        } else {
            this.name = '';
            this.id = undefined;
            this.img = '';
            this.user = undefined;
            this.hospital = undefined;
        }
    }

}

