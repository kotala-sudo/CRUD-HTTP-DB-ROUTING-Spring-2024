import { Injectable } from '@angular/core';
import { Student } from './student';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  //used to assign next ID for student
  nextID: number = 1000;

  //currentStudent - to track the student object to edit.
  currentStudent!: Observable<Student>;

  studentURL = 'https://studentinfo-34d9e-default-rtdb.firebaseio.com/';

  //router is declared public so it can accessed from other components.
  constructor(public router:Router, private http:HttpClient) {}

  incrementNextID(){
    this.nextID++;
  }

  addStudent(newStd: Student) {
    return this.http.post(this.studentURL + "students.json", newStd);
    // this.router.navigate(['/student-list'])//redirects to student-list component
  }

  //sets the currentStudent to the student object when user clicks the edit button
  setCurrentStudent(std:Student){
    this.currentStudent = new Observable<Student>(
      observer => observer.next(std)
    );
  }

  getStudents(): Observable<Student[]>{
    return this.http.get<{[key: string]: Student}>(this.studentURL + "students.json")
    .pipe(map(
      responseData => {
        const studentArray: Student[] = [];
        for(let key in responseData){
          /**using spread operator to expand the iterable
           * so skey property can be assigned the value of key
          * */
         if(responseData.hasOwnProperty(key))
            studentArray.push({... responseData[key], skey: key})
          console.log({...responseData})
        }
        return studentArray;
      }
    ));
  }

  updateStudent(updatedStd: Student){
    return this.http.put(this.studentURL + "students/" + `${updatedStd.skey}.json`,updatedStd)
  }

  delete(key:string){
    return this.http.delete(this.studentURL + "students/" + `${key}.json`);
  }

  deleteAll() {
    this.nextID = 1000;//reset the value of nextID to initial value
    this.http.delete(this.studentURL + "students.json").subscribe();
  }
}
