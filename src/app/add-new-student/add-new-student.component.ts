import { Component } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-new-student.component.html',
  styleUrl: './add-new-student.component.css'
})
export class AddNewStudentComponent {
  sName!: string;
  sAge!: number;

  constructor(private router: Router, private stdService: StudentService) {}

  addNewStudent() {
    const newStudent: Student = {
      id: this.stdService.nextID,
      name: this.sName,
      age: this.sAge,
    };
    this.stdService.addStudent(newStudent).subscribe(
     () => {
      this.stdService.incrementNextID();
      //redirect the user to student-list component
      this.router.navigateByUrl('/student-list')
     } 
    );
  }
}
