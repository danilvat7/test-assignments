import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { EmployeesComponent, CreateEmployeeComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
  },
  { path: 'create', component: CreateEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
