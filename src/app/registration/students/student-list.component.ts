import { Student } from './../../model/student';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegistrationService } from './../../service/registration.service';

import { StudentRegDetails } from '../../model/student-reg-details';

@Component({
  selector: 'app-registration-student',
  templateUrl: './student-list.component.html',
  styleUrls: ['../registration.component.css']
})
export class StudentListComponent implements OnInit {

  public student: Array<Student>;
  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    newStudentMessage = false
  ) { }

  ngOnInit() {
   
   // this.newStudentMessage = this.registrationService.isNewStudentAdded;
    this.registrationService.isNewStudentAdded = false;
    // this.alertService.displayMessage(
    //   'add-user',
    //   this.registrationService.displayMessage,
    //   'success',
    //   ''
    // );

    
  }

  public goToAddNewStudent() {
    this.router.navigate(['registration/student', -1]);
  }
  public goToEditStudentDetails(student) {
    if (student.active) {
      this.router.navigate(['registration/student', student.studentname]);
    }
  }



  
}