// tslint:disable: no-string-literal
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeeComponent } from './create-employee.component';
import { EmployeesService } from './../../employees.service';

import {
  MockEmployeesService,
  parsedEmployeesList,
} from './../../../../../test-utils';
import { of } from 'rxjs';

describe('CreateEmployeeComponent', () => {
  let component: CreateEmployeeComponent;
  let employeesService: EmployeesService;
  let fixture: ComponentFixture<CreateEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEmployeeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: EmployeesService, useValue: new MockEmployeesService() },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmployeeComponent);
    component = fixture.componentInstance;
    employeesService = fixture.debugElement.injector.get(EmployeesService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new employee and call location.back', () => {
    spyOn(employeesService, 'createEmloyees').and.returnValue(
      of(parsedEmployeesList[0])
    );
    spyOn(component['location'], 'back');

    component.onFormSubmit(parsedEmployeesList[0]);

    expect(employeesService.createEmloyees).toHaveBeenCalledWith(
      parsedEmployeesList[0]
    );
    expect(component['location'].back).toHaveBeenCalled();
  });
});
