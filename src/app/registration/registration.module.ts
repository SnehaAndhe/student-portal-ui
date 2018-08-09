import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgModule } from '@angular/core';
import { RegistrationRoutingModule } from './../registration/registration-routing.module';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './registration.component';
//import { StudentListComponent } from './../registration/students/student-list.component';
import { StudentDetailsComponent } from './../registration/students/student-details.component';


@NgModule({
  imports: [RegistrationRoutingModule],
  declarations: [
    RegistrationComponent,
    //StudentListComponent,
    StudentDetailsComponent
    
  ]
})
export class RegistrationModule { } 