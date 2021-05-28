import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css']
})
export class TestApiComponent implements OnInit {
  responce: any;

  constructor(private router: Router,private api: ApiService) { }

  ngOnInit(): void {
  }

  add_user() {
  this.responce = this.api.adduser('testuser','testpass','testemail@email.ru').subscribe(
    data =>{
        this.responce = JSON.stringify(data);

    }
  )
  }

  login() {
    this.responce = this.api.login('testuser','testpass').subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  add_contact() {
    this.responce = this.api.add_contact('contactemail@contact.ru','testaddress','7897898').subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  get_contact() {
    this.responce = this.api.get_contact().subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  add_person() {
    this.responce = this.api.add_rperson('personname','personrole','persontype',132123).subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  get_person() {
    this.responce = this.api.get_rperson().subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  add_m_types() {
    this.responce = this.api.add_m_types('type_name','typeformat','type description sfas sdgs sdgs').subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  get_m_types() {
    this.responce = this.api.get_m_types().subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  add_m_collection() {
    this.responce = this.api.add_m_collection('collection name','50',132456,654321,999898).subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  get_m_collection() {
    this.responce = this.api.get_m_collection(999898).subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  add_monitor() {
    this.responce = this.api.add_monitor('monitor name',654321).subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  get_monitor() {
    this.responce = this.api.get_monitor(654321).subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  add_m_object() {
    this.responce = this.api.add_monitoring_o('monitoring obj name','Kubernetes','145.214.444.178:4321','linux','ACTIVE').subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  get_m_object() {
    this.responce = this.api.get_monitoring_o().subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  add_r_script() {
    this.responce = this.api.add_r_script('Reaction script name','LAST(REP_NUMBER) 10','CORDON',654321).subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  get_r_script() {
    this.responce = this.api.get_r_script(654321).subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  add_reaction() {
    this.responce = this.api.add_reaction('Succes','CORDON activated',13546).subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  get_reaction() {
    this.responce = this.api.get_reaction(13546).subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  add_project() {
    this.responce = this.api.add_project('Project name','Project description',654321).subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }

  get_project() {
    this.responce = this.api.get_project().subscribe(
      data =>{
        this.responce = JSON.stringify(data);
      }
    )
  }
}
