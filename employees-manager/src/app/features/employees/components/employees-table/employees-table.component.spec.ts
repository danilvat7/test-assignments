// tslint:disable: no-string-literal
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesTableComponent } from './employees-table.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

import { parsedEmployeesList } from './../../../../../test-utils';

describe('EmployeesTableComponent', () => {
  let component: EmployeesTableComponent;
  let fixture: ComponentFixture<EmployeesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [EmployeesTableComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesTableComponent);
    component = fixture.componentInstance;

    component.employees = parsedEmployeesList;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initDataSource', () => {
    spyOn<any>(component, 'initDataSource');
    fixture.detectChanges();
    expect(component['initDataSource']).toHaveBeenCalled();
  });

  it('should init data source for table', () => {
    component['initDataSource']();
    expect(
      component.employeesDataSource instanceof MatTableDataSource
    ).toBeTrue();
    expect(component.employeesDataSource.data).toEqual(
      new MatTableDataSource(parsedEmployeesList).data
    );
  });

  it('should filter employees', () => {
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement;
    const searchInput = nativeElement.querySelector(
      'input'
    ) as HTMLInputElement;
    searchInput.value = 'Tiger';
    searchInput.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();

    expect(component.employeesDataSource.filteredData).toEqual([
      parsedEmployeesList[0],
    ]);
  });
});
