import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '../../services/search.service';

import { User } from '../../models/user.model';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';
import { Types } from '../../interfaces/general-types.interface';

@Component({
  selector: 'app-quest-general',
  templateUrl: './quest-general.component.html',
  styleUrls: ['./quest-general.component.css']
})
export class QuestGeneralComponent implements OnInit {

  public users: User[] = [];
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];

  public typeUser: Types = Types.USERS;
  public typeDoctor: Types = Types.DOCTORS;
  public typeHospital: Types = Types.HOSPITALS;

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({term}) => {
      this.callSearch(term);
    })
  }

  callSearch( term: string ) {
    this.searchService.globalSearch(term)
      .subscribe( ({users, hospitals, doctors}) => {
        this.users = users;
        this.hospitals = hospitals;
        this.doctors = doctors;
      })
  }

}
