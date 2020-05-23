import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interfaces
import { IEmployee } from './../../interfaces';

// Services
import { HttpClientService } from './../../core/services';
/**
 * EmployeesService
 * Services Employees module
 */
@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private httpClient: HttpClientService) {}

  /**
   * Gets employees and parses data from db
   */
  getEmloyees(): Observable<IEmployee[]> {
    return this.httpClient.get<{ data: IEmployee[] }>('employees').pipe(
      map((item) => {
        const { data } = item;
        return data.map((employee: any) => {
          return {
            id: employee.id,
            name: employee.employee_name,
            salary: employee.employee_salary,
            age: employee.employee_age,
          };
        });
      })
    );
  }

  /**
   * Creates new employee
   */
  createEmloyees(data: IEmployee): Observable<IEmployee> {
    return this.httpClient
      .post<{ data: IEmployee }>('create', data)
      .pipe(map((item) => item.data));
  }
}
