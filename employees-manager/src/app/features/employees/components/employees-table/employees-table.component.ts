import { Component, OnInit, Input } from '@angular/core';

// Material UI
import { MatTableDataSource } from '@angular/material/table';

// Interfaces
import { IEmployee } from './../../../../interfaces';

/**
 * Employees Table Component
 * Displays employees list
 */
@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss'],
})
export class EmployeesTableComponent implements OnInit {
  @Input() employees: IEmployee[];
  employeesDataSource: MatTableDataSource<IEmployee>;
  /**
   * Table fields data
   */
  displayedColumns: string[] = ['name', 'salary', 'age'];
  columnsNames: string[] = ['Name', 'Salary', 'Age'];

  constructor() {}

  ngOnInit() {
    this.initDataSource();
  }
  /**
   * Inits data source and custom filter for table
   */
  private initDataSource(): void {
    this.employeesDataSource = new MatTableDataSource(this.employees);
    this.employeesDataSource.filterPredicate = (data, filter) =>
      data.name.toLowerCase().indexOf(filter) > -1;
  }

  /**
   * Filters table by name
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeesDataSource.filter = filterValue.trim().toLowerCase();
  }
}
