import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [];

  constructor(
    // private http: HttpClient
    ) { }

  // getMenu() {

  //   const url = `${base_url}/`

  // }

  // public menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Main', url: '/dashboard' },
  //       { title: 'ProgressBar', url: '/dashboard/progress' },
  //       { title: 'Graphics', url: '/dashboard/graphic1' },
  //     ]
  //   },
  //   {
  //     title: 'Maintenance',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Users', url: '/dashboard/users' },
  //       { title: 'Hospitals', url: '/dashboard/hospitals' },
  //       { title: 'Doctors', url: '/dashboard/doctors' },
  //     ]
  //   }
  // ]


}
