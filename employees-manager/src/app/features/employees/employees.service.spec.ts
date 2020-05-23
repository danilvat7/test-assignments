import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { EmployeesService } from './employees.service';

import { environment } from './../../../environments/environment';

const apiUrl = environment.apiUrl;

import {
  dbEmployeesList,
  parsedEmployeesList,
} from './../../../test-utils/mock-data';

describe('Service: Employees', () => {
  let service: EmployeesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeesService],
    });

    service = TestBed.inject(EmployeesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get employees', () => {
    service
      .getEmloyees()
      .subscribe((data) => expect(data).toEqual(parsedEmployeesList));

    const req = httpTestingController.expectOne(`${apiUrl}/employees`);

    expect(req.request.method).toEqual('GET');

    req.flush(dbEmployeesList);
  });

  it('should create employee', () => {
    service
      .createEmloyees(parsedEmployeesList[0])
      .subscribe((data) => expect(data).toEqual(parsedEmployeesList[0]));

    const req = httpTestingController.expectOne(`${apiUrl}/create`);

    expect(req.request.method).toEqual('POST');

    req.flush({ data: parsedEmployeesList[0] });
  });
});
