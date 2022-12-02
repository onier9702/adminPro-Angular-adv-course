import { Component, OnInit } from '@angular/core';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

declare function customInitFunction(): Function;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // call customInitFunction() who will initialize the script ...custom.js on index.html
    customInitFunction();
    // href="./assets/css/colors/default-dark.css"
    const account = new AccountSettingsComponent();
    const element = account.linkThemeFromIndexHTML;
    const themeFromLocalStorage = localStorage.getItem('theme') || './assets/css/colors/blue-dark.css';
    element?.setAttribute('href', themeFromLocalStorage);
  }

}
