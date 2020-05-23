import { Component } from '@angular/core';
import { Location } from '@angular/common';
// Interfaces
import { IEmployee } from './../../../../interfaces';

// Services
import { EmployeesService } from './../../employees.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent {
  constructor(
    private employeesService: EmployeesService,
    private location: Location
  ) {}

  onFormSubmit(value: IEmployee): void {
    this.employeesService
      .createEmloyees(value)
      .subscribe((_) => this.location.back());
  }
}
