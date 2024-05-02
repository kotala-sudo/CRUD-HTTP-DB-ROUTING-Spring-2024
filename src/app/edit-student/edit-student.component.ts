import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent {
  currentStudent!: Student;

  constructor(private stdService: StudentService){}

  ngOnInit(){
    this.stdService.currentStudent.subscribe(
      (data:Student) => this.currentStudent = data
    )
    console.log(this.currentStudent)
  }

  editStudent(){
    this.stdService.updateStudent(this.currentStudent).subscribe(
      //redirect to student-list
      () => this.stdService.router.navigate(['/student-list'])
     );
    
  }
}
