import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { StudentRegDetails } from "./../model/student-reg-details"

@Injectable()
export class RegistrationService{

    isNewStudentAdded : Boolean;
    displayMessage : String;

    getSpecificStudent<T>(arg0: any): any {
        throw new Error("Method not implemented.");
    }

    saveStudent<StudentResponse>(studentRegDetails: StudentRegDetails) : Observable<StudentRegDetails> {
        return null;
    }
}