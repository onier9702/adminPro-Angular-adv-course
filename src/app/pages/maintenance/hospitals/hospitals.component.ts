import { Component, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';

import { HospitalService } from '../../../services/hospital.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchService } from '../../../services/search.service';

import { Hospital } from '../../../models/hospital.model';
import { Types } from 'src/app/interfaces/general-types.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {
  
  private imgSubs!: Subscription;
  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  public types: Types = Types.HOSPITALS;

  constructor( private hospitalService: HospitalService,
               private modalImageService: ModalImageService,
               private searchService: SearchService,
  ) 
  {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadAllHospitals();

    this.imgSubs = this.imgSubs = this.modalImageService.newImgWasUploaded
      .pipe(delay(200))
      .subscribe( img => this.loadAllHospitals() );
  }

  searchHospital( terminus: string ) {

    if ( terminus.length === 0 ) {
      return this.loadAllHospitals();
    }

    this.searchService.searchByCollection( Types.HOSPITALS, terminus )
        .subscribe( resp => {
          this.hospitals = resp;
        });
  }

  loadAllHospitals() {

    this.loading = true;
    this.hospitalService.loadHospitals()
        .subscribe( hospitals => {
          this.loading = false;
          this.hospitals = hospitals;          
        })

  }

  saveChanges( hospital: Hospital ) {

    this.hospitalService.updateHospital( hospital.id, hospital.name )
        .subscribe( resp => {
          Swal.fire( 'Updated', hospital.name, 'success' );
        });

  }

  removeHospital( hospital: Hospital ) {

    this.hospitalService.removeHospital( hospital.id )
        .subscribe( resp => {
          this.loadAllHospitals();
          Swal.fire( 'Removed', hospital.name, 'success' );
        });

  }

  async openSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create hospital',
      text: 'Enter the name of the new Hospital',
      input: 'text',
      inputPlaceholder: 'Hospital Name',
      showCancelButton: true,
    });
    
    if( value.trim().length > 0 ) {
      this.hospitalService.createHospital( value )
        .subscribe( (resp: any) => {
          this.hospitals.push( resp.hospital )
        })
    }
  }

  showModal(hospital: Hospital) {    
    this.modalImageService.openModal( Types.HOSPITALS, hospital.id, hospital.img );
  }

}
