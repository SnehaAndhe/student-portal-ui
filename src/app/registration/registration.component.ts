import { Component, OnInit } from '@angular/core';
import {RegistrationService} from './../service/registration.service';
import { Student} from './../model/student';
import {Router} from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public Selected;
  student: Student;

  constructor(private router: Router, private registrationService : RegistrationService) { }

  ngOnInit() {
  }

}
