import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { User } from '../../models/user.model';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public rememberMe: boolean = false;
  public staticEmail!: string;

  public auth2: any;

  constructor( 
      private fb: FormBuilder,
      private userService: UserService,
      private router: Router,
      private ngZone: NgZone // this is because Angular work other libraries as global instance
      // it means more below when after sign google in Angular want to navigateByUrl inside that 
      // function who belong google and not is from Angular so it's Google library...
      // for this reason Angular have NgZone to handle angular code inside functions from other libraries 
    ) { }

  ngOnInit(): void {

    this.renderButton();
    this.createForm();
    this.staticEmail = localStorage.getItem('email') || '';
    if (this.staticEmail.length > 1) {
      this.rememberMe = true;
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: [ 'onier0217@gmail.com', [ Validators.required, Validators.email ] ],
      password: [ '123456', [ Validators.required ] ],
      remember: [ false ]
    })
  };

  submitUser() {

    const form = this.loginForm.value;

    if ( form.invalid ) {
      return;
    }

    // let user = new User(null, form.value.email, form.value.password, null)
    this.userService.loginUser( form, form.remember )
      .subscribe( resp => {
        if ( resp.ok ) {
          this.router.navigateByUrl('/dashboard');
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
    return !this.loginForm.controls['password2'].valid;
  }

  // Google Sign In
  
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  async startApp() {
    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element: any) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) => {
          const id_token = googleUser.getAuthResponse().id_token;
          console.log(id_token);
          this.userService.loginGoogle( id_token )
            .subscribe( resp => {
              this.ngZone.run( () => {
                this.router.navigateByUrl('/dashboard');
              } )
            });
        }, (error: any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

  // END Google sign in

}
