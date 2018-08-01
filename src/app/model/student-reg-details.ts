import { Student} from './../model/student';





export class StudentRegDetails{
    firstName? : string;
    lastName? : string;
    email? : string;
    phoneNumber? : string;
    address? : string;
    studentId : string;
    errorMessage: string;
    success: boolean;
    student : Student;
    phoneAsString: string;
    displayMessage : string;
    mode : string;

}