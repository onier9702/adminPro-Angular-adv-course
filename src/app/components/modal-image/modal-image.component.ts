import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Types } from '../../interfaces/general-types.interface';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {

  public fileToUpload!: File;
  public imgTemplatePreview: any = '';

  constructor(
    public modalImageService: ModalImageService,
    public fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalImageService.closeModal();
    this.imgTemplatePreview = null;
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

  uploadFileSinceModal() {

    const type: Types = this.modalImageService.type;
    const id: string = this.modalImageService.id;
    this.fileUploadService.updateFileUpload( this.fileToUpload, type, id )
      .then( resp => {
        if ( resp.ok ) {
          this.modalImageService.newImgWasUploaded.emit(resp.file);
          this.closeModal();
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
