import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './../registration/students/student-list.component';
import { StudentDetailsComponent } from './students/student-details.component';
import { RegistrationComponent } from './registration.component';


const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
    children: [
      {
        path: 'students',
        component: StudentListComponent
      },
    ]
  },
  {
    path: 'student/:id',
    component: StudentDetailsComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {}
