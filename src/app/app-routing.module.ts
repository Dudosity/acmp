import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import {LoginComponent } from './login/login.component';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule,
  NbLayoutModule,
  NbListModule, NbRadioModule, NbSelectModule,
  NbSidebarModule,
  NbThemeModule, NbUserModule, NbContextMenuModule,NbMenuModule
} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {FormsModule as ngFormsModule} from "@angular/forms";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbListModule,
    NbCardModule,
    NbUserModule,
    ngFormsModule,
    NbInputModule,
    NbActionsModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbContextMenuModule,
    NbMenuModule,],
  exports: [RouterModule],
})
export class AppRoutingModule { }
