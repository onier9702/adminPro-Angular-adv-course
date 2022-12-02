import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public linkThemeFromIndexHTML = document.querySelector('#theme');
  public allLinks!: NodeListOf<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
    this.allLinks = document.querySelectorAll('.selector'); // select all ancors in html
    this.setCheckToTheme();
  }

  changeTheme( theme: string ) {
    const url = `./assets/css/colors/${ theme }.css`;
    this.linkThemeFromIndexHTML?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.setCheckToTheme();
  }

  setCheckToTheme(): void {
    this.allLinks.forEach( elem => {
      elem.classList.remove('working');
      const theme = elem.getAttribute('data-theme');
      const urlIterator = `./assets/css/colors/${ theme }.css`;
      const urlChoosen = this.linkThemeFromIndexHTML?.getAttribute('href');
      if ( urlIterator === urlChoosen ) {
        elem.classList.add('working');
      }
    })
  }

}
