
interface HospitalUser {
    id: string;
    name: string;
    img: string;
}


export class Hospital {

    public name!: string;
    public id?: string;
    public img!: string;
    public user?: HospitalUser;

    constructor( hospital?: Hospital ) {
        if (hospital) {
            this.name = hospital['name'];
            this.id = hospital['id'];
            this.img = hospital['img'];
            this.user = hospital['user'];
        } else {
            this.name = '';
            this.id = undefined;
            this.img = 'no-image';
            this.user = undefined;
        }
    }

}

