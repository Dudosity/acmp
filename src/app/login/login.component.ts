import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import {NbSidebarService} from "@nebular/theme";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
    this.sidebarService.toggle(true);
    return false;
  }
  isLogin = false;
  constructor(private sidebarService: NbSidebarService,private router: Router) {
  }
  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['/main'])
  }
}
