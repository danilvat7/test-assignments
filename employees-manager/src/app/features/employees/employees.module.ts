import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing
import { EmployeesRoutingModule } from './employees-routing.module';

// Shared
import { SharedModule } from './../../shared/shared.module';

// Components
import {
  EmployeesComponent,
  CreateEmployeeComponent,
  EmployeesTableComponent,
  EmploeeFormComponent,
} from './components';

@NgModule({
  imports: [CommonModule, EmployeesRoutingModule, SharedModule],
  declarations: [
    EmployeesComponent,
    CreateEmployeeComponent,
    EmployeesTableComponent,
    EmploeeFormComponent,
  ],
})
export class EmployeesModule {}
