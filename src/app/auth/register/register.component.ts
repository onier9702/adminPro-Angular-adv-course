import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;

  constructor( 
      private fb: FormBuilder,
      private userService: UserService,
      private router: Router
    ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      name: [ 'Onier', [ Validators.required, Validators.minLength(2) ] ],
      email: [ 'onier0217@gmail.com', [ Validators.required, Validators.email ] ],
      password: [ '123456', [ Validators.required ] ],
      password2: [ '123456', [ Validators.required ] ],
      terms: [ false, [ Validators.required ] ],
    }, {
      validators: this.samePassword('password', 'password2')
    } )
  };

  submitUser() {

    console.log('form: ', this.registerForm.value);
    if ( this.registerForm.invalid ) {
      return;
    }
    this.userService.saveUser( this.registerForm.value )
      .subscribe( resp => {
        if ( resp.ok ) {
          Swal.fire( 'Great', `User ${resp.user.name} was created`, 'success'  );
          this.router.navigateByUrl('/auth/login');
        } else {
          Swal.fire( 'Error', resp.error.msg , 'error' );
        }
      });
  }

  samePassword( pass1: string, pass2: string ) {

    return (formGroup: FormGroup) => {

      const pass1Name = formGroup.get(pass1);
      const pass2Name = formGroup.get(pass2);
      if ( pass1Name?.value === pass2Name?.value  ) {
        pass2Name?.setErrors(null);
      } else {
        pass2Name?.setErrors( {notTheSamePassword: true} );
      };

    }

  }

  messageErrorPassword(): boolean {
    // this validations is thanks to methods samePassword(), 
    // implemented before, where control['password2'] was set errors or not
    return !this.registerForm.controls['password2'].valid;
  }

}
