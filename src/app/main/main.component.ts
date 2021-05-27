import { Component, OnInit } from '@angular/core';

import { NbSidebarService } from '@nebular/theme';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService) { }

  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];
  ngOnInit(): void {
  }

  hide_sidebar() {
    this.sidebarService.toggle();
  }
}
