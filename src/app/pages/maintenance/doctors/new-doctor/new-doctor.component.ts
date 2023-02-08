import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HospitalService } from '../../../../services/hospital.service';
import { DoctorService } from '../../../../services/doctor.service';

import { Hospital } from '../../../../models/hospital.model';
import { Doctor } from '../../../../models/doctor.model';
import { Types } from '../../../../interfaces/general-types.interface';
import { delay } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-doctor',
  templateUrl: './new-doctor.component.html',
  styleUrls: ['./new-doctor.component.css']
})
export class NewDoctorComponent implements OnInit {

  public doctorForm!: FormGroup;
  public hospitals: Hospital[] = [];
  
  public doctorSelected!: Doctor;
  public hospitalSelected!: Hospital | undefined;

  public type: Types = Types.DOCTORS;
  public typeHospital: Types = Types.HOSPITALS;



  constructor( private fb: FormBuilder,
               private hospitalService: HospitalService,
               private doctorService: DoctorService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({ id }) => this.loadDoctor( id ) );

    this.doctorForm = this.fb.group({
      name: ['', Validators.required ],
      hospital: ['', Validators.required ],
    });

    this.loadHospitals();

    this.doctorForm.controls['hospital'].valueChanges
        .subscribe( hospitalId => {
          this.hospitalSelected = this.hospitals.find( h => h.id === hospitalId );
        })
  }

  loadDoctor(id: string) {

    if ( id === 'new' ) {
      return;
    }
    
     this.doctorService.getDoctorByID( id )
      .pipe(
        delay(200)
      )
      .subscribe( (doctor) => {

        if ( !doctor ) {
          return this.router.navigateByUrl(`/dashboard/doctors`);
        }

        const { name, hospital:{ _id } } = doctor; 
        this.doctorSelected = doctor;
        return this.doctorForm.setValue({ name, hospital: _id });
      });

  }

  loadHospitals() {

    this.hospitalService.loadHospitals()
      .subscribe( (hospitals: Hospital[]) => {
        this.hospitals = hospitals;
      })

  }

  saveDoctor() {

    const { name } = this.doctorForm.value;

    if ( this.doctorSelected ) {
      // update
      const data = {
        ...this.doctorForm.value,
        id: this.doctorSelected.id
      }
      this.doctorService.updateDoctor( data )
        .subscribe( () => {
          Swal.fire('Updated', `${ name } updated correctly`, 'success');
        })

    } else {
      // create
      this.doctorService.createDoctor( this.doctorForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Success', `${ name } created correctly`, 'success');
            this.router.navigateByUrl(`/dashboard/doctor/${ resp.doctor.id }`)
        })
    }

  }

}
