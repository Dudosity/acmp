import { Component, OnInit } from '@angular/core';

import { NbSidebarService } from '@nebular/theme';
import { Router } from '@angular/router';
import {ApiService} from "../api.service";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  responce: any;
  m_objects: any;
  constructor(private sidebarService: NbSidebarService,private api: ApiService) { }

  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];
  ngOnInit(): void {

      this.responce = this.api.get_project().subscribe(
        data =>{
          this.responce = data;
        }
      )
      this.m_objects = this.api.get_monitoring_o().subscribe(
        data =>{
          this.m_objects = data;
        }
      )
  }

  hide_sidebar() {
    this.sidebarService.toggle();
  }

  get_m_objects() {

  }
}
