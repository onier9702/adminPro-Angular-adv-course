import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../auth/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private userService: UserService,
               private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      return this.userService.revalidateToken()
        .pipe(
          tap( valid => {
            if ( !valid ) {
              this.router.navigateByUrl('/auth/login');
            }
          } )
        )
      }
  
}
