import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay, Subscription } from 'rxjs';

import { UserService } from '../../../auth/services/user.service';
import { SearchService } from '../../../services/search.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { User } from '../../../models/user.model';
import { Types } from 'src/app/interfaces/general-types.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public loading: boolean = true;
  public currentSincePage: number = 0;
  public pageFinishToLoad: boolean = false;
  public arrayNumbers: number[] = [];
  public arrayPositions: number[] = [];
  public activePosition: number = 0;
  public divisor: number = 2;

  public imgSub!: Subscription;

  constructor( 
    private userService: UserService,
    private searchService: SearchService,
    private modalImageService: ModalImageService,
    ) {}

  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  }

  ngOnInit(): void {
    this.callPaginationUsers();

    // see when an image change from modal component
    this.imgSub = this.modalImageService.newImgWasUploaded
      .pipe(
        delay(100)
      )
      .subscribe( img => {
        console.log('Image change from Modal-Component: ', img);
        this.callPaginationUsers();
      } )
  }

  changePage( type: string ) {
    if (type === 'preview') {
      if (this.currentSincePage > 1) {
        this.currentSincePage = this.currentSincePage - 2;
        this.activePosition -= 1;
      }
      else return;
    } else if (type === 'next') {
      if ( this.currentSincePage < (this.totalUsers - 2) ) {
        this.currentSincePage = this.currentSincePage + 2;
        this.activePosition += 1;
      } else {
        return;
      }
    }
    this.callPaginationUsers();
  }

  // load All Users and transform them to paginated
  callPaginationUsers() {
    this.userService.loadAllUsersFromDB(this.currentSincePage)
      .subscribe( ({users, count}) => {        
        this.totalUsers = count;
        if ( !this.pageFinishToLoad ) {
          let pointer = 0;
          for (let x = 0; x < (this.totalUsers)/2; x++) {
            this.arrayNumbers.push( x + 1 );  
            this.arrayPositions.push(pointer);
            pointer += this.divisor;
          }
          this.pageFinishToLoad = true;
        }
        this.users = users;
        this.usersTemp = users;
        this.loading = false;
      })
  }

  goToNumberPaginator(i: number) {
    this.currentSincePage = this.arrayPositions[i];
    this.callPaginationUsers();
    this.activePosition = i;
  }

  // isOddOrEven( i: number ): boolean {
  //   const result = i % 2;
  //   return ( result === 0 ) ? true : false;
  // }

  search(term: string) {
    if (!term.length) {
      this.users = [...this.usersTemp];
      return;
    };
    this.searchService.searchByCollection( Types.USERS, term )
      .subscribe( (resp: User[]) => {
        this.users = resp;
      })
    
  }

  async removeUser( uid: string = '' ) {

    if ( this.userService.getUID === uid ) {
      return Swal.fire('Error', 'You should not erase yourself', 'error');
    }

    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteOneUser(uid)
          .subscribe( resp => {
            this.callPaginationUsers();
            Swal.fire('User was removed', 'Successfull', 'success');
          })
      }
    })
    
  }

  changeRole(user: User) {

    this.userService.changeRole( user )
      .subscribe( resp => {
        console.log(resp);
      })
    
  }

  openModalImage(user: User) {
    this.modalImageService.openModal(Types.USERS, user.uid, user.img);
  }

}
