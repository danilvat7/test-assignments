import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

// Interfaces
import { IEmployee } from './../../../../interfaces';

// Services
import { FileReaderService } from './../../file-reader.service';

/**
 * EmployeesTableComponent
 * Displays parsed employees list
 */
@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss'],
})
export class EmployeesTableComponent implements OnInit {
  employeesData$: Observable<IEmployee[]>;

  /**
   * Table fields data
   */
  displayedColumns: string[] = [
    'firstname',
    'surname',
    'issueCount',
    'dateOfBirth',
  ];
  columnsNames: string[] = [
    'Firstname',
    'Surname',
    'Issue Count',
    'Date Of Birth',
  ];

  constructor(private fileReaderService: FileReaderService) {}

  /**
   * Gets employees data from the service
   */
  ngOnInit() {
    this.employeesData$ = this.fileReaderService.employeesData;
  }
}
