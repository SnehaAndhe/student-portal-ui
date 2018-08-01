import { Student} from './../../model/student';
import { StudentResponse} from './../../model/dto/student-response';
import { StudentRegDetails} from './../../model/student-reg-details';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  AbstractControl,
  Validators,
  FormArray,
  ValidatorFn
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { RegistrationService } from '../../service/registration.service';

@Component({
  selector: 'app-registration-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['../registration.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: StudentRegDetails = new StudentRegDetails();

  students: Student;
  formGroup: FormGroup;
  studentId: string;
  submitBtnText = 'UPDATE';
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  studentID: FormControl;
  phoneAsString: FormControl;
  address:FormControl;

  studentFormUnsubmitted = true;
  userName: string;
  emailErrors: any;
  firstNameErrors: any;
  lastNameErrors: any;
  phoneAsStringErrors: any;
  studentIDErrors: any;
  addressErrors: any;
  minLengthArray: any;
  phnNumPattern = '^((\\+91-?)|0)?[0-9]{1,10}$';
  emailPattern = /[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{1,}[.]{1}[a-zA-Z]{1,}/;

  @ViewChild('phone') phoneElement: ElementRef;
  checkValue: boolean;
  empIdPattern = '^[A-Za-z0-9]{1,8}';
  constructor(
    private router: Router,
    private registrationService: RegistrationService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createStudentForm();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.studentId = params['id'];
      if (this.studentId !== '-1') {
        this.studentID.clearValidators();
      }
      if (this.studentId !== '-1') {
        this.getSpecificStudent(this.studentId);
      } else {
        this.submitBtnText = 'ADD Student';
        this.checkValue = false;
        this.formGroup.controls['workforceId'].disable();
        this.initializeStudent();
      }
    });
  }

  initializeStudent() {
    // this.registrationService
    //   .subscribe((user: StudentResponse) => {
    //     this.student = this.student.student;
    //   });
  }


   

  

  createStudentForm() {
    this.firstName = new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    });
    this.firstNameErrors = {
      required: 'First Name is required'
    };
    this.lastName = new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    });
    this.lastNameErrors = {
      required: 'Last Name is required'
    };

    this.studentID = new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailPattern)
      ],
      updateOn: 'blur'
    });

    this.studentIDErrors = {
      required: 'StudentID is required',
      email: 'Student Id is not valid',
      invalid: ''
    };
    this.email = new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailPattern)
      ],
      updateOn: 'blur'
    });
    this.emailErrors = {
      required: 'Email is required',
      email: 'Email is not valid',
      invalid: ''
    };
    
    this.phoneAsString = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(this.phnNumPattern)
      ],
      updateOn: 'blur'
    });
    this.phoneAsStringErrors = {
      required: 'Phone Number is required',
      minlength: 'Minimum 10 char',
      maxlength: 'Maximum 10 char',
      pattern: 'Invalid phone number'
    };
    
    this.formGroup = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      studentID: this.studentID,
      phoneAsString: this.phoneAsString,
      address: this.address,
    });

    console.log('form group', this.student);

    if (this.student) {
      this.formGroup
        .get('firstame')
        .patchValue(this.student.student.firstName);
      this.formGroup.get('lastName').patchValue(this.student.student.lastName);
      this.formGroup.get('studentID').patchValue(this.student.student.id);
 this.formGroup.get('email').patchValue(this.student.email);
 this.formGroup
 .get('phoneAsString')
 .patchValue(this.student.phoneAsString);
 
 }
 }



 addStudent(): void {
 console.log('form Details before submission', this.formGroup);
 this.studentFormUnsubmitted = true;
 this.student.firstName = this.firstName.value;
 this.student.lastName = this.lastName.value;
 this.student.studentId = this.studentID.value;
 this.student.email = this.email.value;
 this.student.phoneAsString = this.phoneAsString.value;
 this.student.phoneNumber = this.phoneAsString.value;
 this.student.address = this.address.value;
 console.log('this.formGroup.value.roleCd this.formGroup.value.roleCd');
 

 this.registrationService.isNewStudentAdded = false;
 this.registrationService
 .saveStudent(this.student)
 .subscribe(response => {
 if (!response.success) {
 if (response.errorMessage != null && response.errorMessage !== '') {
 this.formGroup.get('studentID').setErrors({ invalid: true });
 this.studentIDErrors.invalid = response.errorMessage;
 }
 } else {
 if (response.mode != null) {
 this.registrationService.isNewStudentAdded = true;

 }
 this.router.navigate(['/practice-setup/users']);
 }
 })
}

 getSpecificStudent( StudentId) {
 this.registrationService
 .getSpecificStudent<StudentResponse>(this.studentId)
 .subscribe(data => {
 this.student = data.student;
 this.populateForm();
 });
 }

 private populateForm() {
 this.firstName.setValue(this.student.firstName);
 this.lastName.setValue(this.student.lastName);
 this.studentID.setValue(this.student.studentId);
 this.email.setValue(this.student.email);

 this.phoneAsString.setValue(this.student.phoneNumber);
 this.phoneElement.nativeElement.focus();
 this.phoneElement.nativeElement.blur();
 
 }

 goToStudent() {
 this.router.navigateByUrl('registration/student');
 }


}