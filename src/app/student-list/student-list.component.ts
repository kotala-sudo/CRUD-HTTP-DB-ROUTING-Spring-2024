import { Component } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
 studentList: Student[] = [];

  constructor(private stdService: StudentService) {}

  ngOnInit() {
    this.fetchData();
  }

  private fetchData(){
    this.stdService.getStudents().subscribe(
      (data:Student[] ) => this.studentList = data
    );
  }

  onClearData() {
    this.studentList = [];
    this.stdService.deleteAll();
  }

  onClickDelete(key: string){
    this.stdService.delete(key).subscribe(
      //refetch data to refersh the student-list
      () => this.fetchData()
    );
  }

  onClickEdit(std: Student){
    this.stdService.setCurrentStudent(std)
    this.stdService.router.navigateByUrl(`/edit-student`)
  }
}
