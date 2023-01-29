import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/dashboard' },
        { title: 'ProgressBar', url: '/dashboard/progress' },
        { title: 'Graphics', url: '/dashboard/graphic1' },
      ]
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Users', url: '/dashboard/users' },
        { title: 'Hospitals', url: '/dashboard/hospitals' },
        { title: 'Doctors', url: '/dashboard/doctors' },
      ]
    }
  ]

  constructor() { }
}
