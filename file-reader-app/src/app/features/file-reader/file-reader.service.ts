import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import * as Papa from 'papaparse';
import { Observable, BehaviorSubject } from 'rxjs';

// Interfaces
import { IEmployee } from './../../interfaces';

/**
 * File Reader Service
 * Serves file reader module
 */
@Injectable({
  providedIn: 'root',
})
export class FileReaderService {
  private parsedEmployeesData = new BehaviorSubject<IEmployee[]>(null);
  private filteredEmployeesData = new BehaviorSubject<IEmployee[]>(null);

  /**
   * Returns filtered employees data
   */
  get employeesData(): Observable<IEmployee[]> {
    return this.filteredEmployeesData.asObservable();
  }

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  /**
   * Parses uploaded files from csv to json
   */
  parseFile(file: File): void {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result: any) => {
        const mergedData = this.employeesDataHandler(result.data);

        this.parsedEmployeesData.next(mergedData);
        this.filteredEmployeesData.next(mergedData);
      },
    });
  }

  /**
   *  Handles employees data from uploaded file
   */
  private employeesDataHandler(data: any): IEmployee[] {
    return data.map((employee: any) => {
      return {
        firstname: employee['First name'],
        surname: employee['Sur name'],
        issueCount: employee['Issue count'],
        dateOfBirth: this.transformDate(employee['Date of birth']),
      };
    });
  }

  /**
   * Transforms dates to a readable format
   */
  private transformDate(date: string): string {
    return formatDate(date, 'yyyy-MM-dd', this.locale);
  }

  /**
   * Filters employees by issue count based on user input
   */
  filterEmployeesByIssueCount(filterValue: string): void {
    const parsedEmployeesData = this.parsedEmployeesData.getValue();
    if (filterValue) {
      this.filteredEmployeesData.next(
        parsedEmployeesData.filter(
          (employee: IEmployee) => employee.issueCount === filterValue
        )
      );
    } else {
      this.filteredEmployeesData.next(parsedEmployeesData);
    }
  }
}
