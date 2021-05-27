import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router"
import {NbSidebarService} from "@nebular/theme";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'monitoring-tool';
  constructor(private sidebarService: NbSidebarService,private router: Router) {
  }
  ngOnInit() {
    this.router.navigate(['/login'])
  }
}
