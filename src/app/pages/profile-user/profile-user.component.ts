import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../auth/services/user.service';
import { FileUploadService } from '../../services/file-upload.service';
import { Types } from 'src/app/interfaces/general-types.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  public profileForm!: FormGroup;
  public user: User;
  public fileToUpload!: File;
  public imgTemplatePreview: any = '';

  constructor( private fb: FormBuilder, 
      private userService: UserService, 
      private fileUploadService: FileUploadService,
      ) {
    this.user = userService.currentUser;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [ this.user.name , [  ] ],
      email: [ this.user.email , [  ] ],
      // password: [ , [  ] ],
    })
  }

  updateProfile() {
    const data = this.profileForm.value;
    // console.log(data);
    this.userService.updateUserProfile( data ).subscribe( (resp) => {
      
      if ( resp.ok ) {
        const { name, email } = data
        this.user.name = name;
        this.user.email = email;
        Swal.fire( 'Info', 'Excelent update', 'success' );

      } else {
        console.log('Error response in component: ', resp);
        Swal.fire( 'Warning', resp.msg, 'error' );
      }
      
    });
    
  }

  changeFile(event: any) {
    // console.log(event.files[0]);
    this.fileToUpload = event.files[0];

    if ( !this.fileToUpload ) {
      this.imgTemplatePreview = null;
      return;
    };

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(this.fileToUpload);

    reader.onloadend = () => {
      // console.log(reader.result); // image in base 64
      this.imgTemplatePreview = reader.result;
      
    } 
  }

  uploadFile() {
    this.fileUploadService.updateFileUpload( this.fileToUpload, Types.USERS, this.user.uid || '' )
      .then( resp => {
        console.log(resp);
        if ( resp.ok ) {
          this.user.img = resp.file;
          Swal.fire('Success', 'Successfully updated', 'success');
        } else {
          Swal.fire('Be Aware', resp.msg, 'warning');
        }
      })
      .catch( err => {
        console.log(err);
        Swal.fire('Error', 'An error has ocurred, please try again', 'error');
      } );
  }

}
