import { Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { AddNewStudentComponent } from './add-new-student/add-new-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

export const routes: Routes = [
    { path: '', redirectTo: '/student-list', pathMatch: 'full' },
    { path: 'student-list', component: StudentListComponent },
    { path: 'add-student', component: AddNewStudentComponent },
    {path: 'edit-student', component:EditStudentComponent}
];
