// tslint:disable: no-string-literal
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EmployeesComponent } from './employees.component';
import { EmployeesService } from './../../employees.service';

import {
  MockEmployeesService,
  parsedEmployeesList,
} from './../../../../../test-utils';
import { of } from 'rxjs';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let employeesService: EmployeesService;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [EmployeesComponent],
      providers: [
        { provide: EmployeesService, useValue: new MockEmployeesService() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    employeesService = fixture.debugElement.injector.get(EmployeesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getEmployees', () => {
    spyOn<any>(component, 'getEmployees');
    fixture.detectChanges();
    expect(component['getEmployees']).toHaveBeenCalled();
  });

  it('should call employeesService.getEmployees and init employees property', () => {
    spyOn(employeesService, 'getEmloyees').and.returnValue(
      of(parsedEmployeesList)
    );

    component['getEmployees']();

    expect(employeesService.getEmloyees).toHaveBeenCalled();
    expect(component.employees).toEqual(parsedEmployeesList);
  });
});
