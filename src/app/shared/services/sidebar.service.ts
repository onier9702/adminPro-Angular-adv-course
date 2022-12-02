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
    }
  ]

  constructor() { }
}
