import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import {
  NbSidebarModule,
  NbButtonModule,
  NbSidebarService,
  NbListModule,
  NbCardModule,
  NbUserModule,
  NbThemeService,
  NbInputModule,
  NbActionsModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbRadioModule,
  NbSelectModule,
  NbContextMenuModule,
  NbMenuModule,
  NbAccordionModule,
  NbTreeGridModule,
} from '@nebular/theme';

import { FormsModule as ngFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { NgxChartsModule }from '@swimlane/ngx-charts';
import { ComponentsComponent } from './components/components.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent,
    ComponentsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    AppRoutingModule,
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
    NbMenuModule.forRoot(),
    NbAccordionModule,
    NgxChartsModule,
    NbTreeGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
