import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Types } from 'src/app/interfaces/general-types.interface';
import Swal from 'sweetalert2';
import { Doctor } from '../../../models/doctor.model';
import { DoctorService } from '../../../services/doctor.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  public doctors: Doctor[] = [];
  public type: Types = Types.DOCTORS;
  private imgSubs!: Subscription;

  constructor( private doctorService: DoctorService,
               private modalImageService: ModalImageService,
               private searchService: SearchService ) { }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.loadDoctors();

    this.imgSubs = this.imgSubs = this.modalImageService.newImgWasUploaded
      .pipe(delay(200))
      .subscribe( img => this.loadDoctors() );
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.loadAllDoctors()
      .subscribe( doctors => {
        this.loading = false;
        this.doctors = doctors;
      });
  }

  searchDoctor( terminus: string ) {

    if ( terminus.length === 0 ) {
      return this.loadDoctors();
    }

    this.searchService.searchByCollection( Types.DOCTORS, terminus )
        .subscribe( resp => {
          this.doctors = resp;
        });
  }

  openModal(doctor: Doctor) {

    this.modalImageService.openModal( Types.DOCTORS, doctor.id, doctor.img );

  }

  removeDoctor( doctor: Doctor ) {

    Swal.fire({
      title: '¿Remove Doctor?',
      text: `You are going to delete ${ doctor.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.value) {
        
        this.doctorService.removeDoctor( doctor.id )
          .subscribe( resp => {
            
            this.loadDoctors();
            Swal.fire(
              'Doctor removed',
              `${ doctor.name } was removed correctly`,
              'success'
            );
            
          });

      }
    })

  }

}
