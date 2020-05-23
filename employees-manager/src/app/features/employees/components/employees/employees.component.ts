import { Component, OnInit } from '@angular/core';

// Interfaces
import { IEmployee } from './../../../../interfaces';

// Services
import { EmployeesService } from './../../employees.service';

/**
 * Root Employees Component
 */
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: IEmployee[];

  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    this.getEmployees();
  }

  /**
   * Gets all employees
   */
  private getEmployees(): void {
    this.employeesService
      .getEmloyees()
      .subscribe((res) => (this.employees = res));
  }
}
