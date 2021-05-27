import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }
  url='http://127.0.0.1:5000';
  token = 'test_token';
  public adduser(username: string, password: string, email: string) {

    return this.httpClient.get(this.url + '/user/add?username=' + username + '&password=' + password + '&email=' + email);
  }

  public login(username: string, password: string) {

    return this.httpClient.get(this.url + '/login?username=' + username + '&password=' + password);
  }

  public add_contact(email: string, address: string, phone_number: string) {

    return this.httpClient.get(this.url + '/contact/add?email=' + email + '&address=' + address + '&phone_number=' + phone_number + '&token=' + this.token);
  }

  public get_contact() {

    return this.httpClient.get(this.url + '/contact/get?token=' + this.token);
  }
  public add_rperson(name: string, role: string, type: string, contactid: number) {

    return this.httpClient.get(this.url + '/r_person/add?name='+name+'&role='+role+'&type='+type+'&contact_id='+contactid+'&token=' + this.token);
  }

  public get_rperson() {

    return this.httpClient.get(this.url + '/r_person/get?token=' + this.token);
  }

  public add_m_types(name: string, format: string, description: string) {

    return this.httpClient.get(this.url + '/m_types/add?name='+name+'&format='+format+'&description='+description+'&token=' + this.token);
  }

  public get_m_types() {

    return this.httpClient.get(this.url + '/m_types/get?token=' + this.token);
  }

  public add_m_collection(name: string, value: string, date_hit: string, metric_type_id: number, monitoring_object_id: number, monitor_id: number) {

    return this.httpClient.get(this.url + '/m_collection/add?name=' + name + '&value=' + value + '&date_hit=' + date_hit + '&metric_type_id=' +
      metric_type_id + '&monitoring_object_id=' + monitoring_object_id + '&monitor_id=' + monitor_id + '&token=' + this.token);

  }
  public add_monitor( name: string,monitoring_object_id: number) {

    return this.httpClient.get(this.url + '/monitor/add?name=' + name+'&monitoring_object_id=' +monitoring_object_id+ '&token=' + this.token);

  }

  public get_monitor( monitoring_object_id: number) {

    return this.httpClient.get(this.url + '/monitor/get?monitoring_object_id=' + monitoring_object_id + '&token=' + this.token);

  }
  public add_monitoring_o( name: string, type: string, address: string, system: string) {

    return this.httpClient.get(this.url + '/monitoring_o/add?name=' + name + '&type=' + type + '&address=' + address + '&system=' + system + '&token=' + this.token);

  }

  public get_monitoring_o() {

    return this.httpClient.get(this.url + '/monitoring_o/get?token=' + this.token);

  }

  public add_r_script( name: string, condition: string, reaction: string, monitoring_object_id: number) {

    return this.httpClient.get(this.url + '/r_script/add?name=' + name + '&condition=' + condition + '&reaction=' + reaction + '&monitoring_object_id=' + monitoring_object_id + '&token=' + this.token);

  }

  public get_r_script(monitoring_object_id: number) {

    return this.httpClient.get(this.url + '/r_script/get?monitoring_object_id='+monitoring_object_id+'&token=' + this.token);

  }
  public add_reaction( status: string, reaction_details: string, reaction_script_id: number) {

    return this.httpClient.get(this.url + '/reaction/add?status=' + status + '&reaction_details=' + reaction_details + '&reaction_script_id=' + reaction_script_id + '&token=' + this.token);

  }

  public get_reaction(reaction_script_id: number) {

    return this.httpClient.get(this.url + '/reaction/get?reaction_script_id='+reaction_script_id+'&token=' + this.token);

  }

}
