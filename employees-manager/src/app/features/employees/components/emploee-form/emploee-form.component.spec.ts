// tslint:disable: no-string-literal
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploeeFormComponent } from './emploee-form.component';
import { parsedEmployeesList } from './../../../../../test-utils';

describe('EmploeeFormComponent', () => {
  let component: EmploeeFormComponent;
  let fixture: ComponentFixture<EmploeeFormComponent>;

  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [EmploeeFormComponent],
      providers: [{ provide: FormBuilder, useValue: formBuilder }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploeeFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form', () => {
    fixture.detectChanges();
    expect(component.form).toBeTruthy();
    expect(component.form.get('name')).toBeTruthy();
    expect(component.form.get('salary')).toBeTruthy();
    expect(component.form.get('age')).toBeTruthy();
  });

  it('should emit on form submit', () => {
    const formValue = parsedEmployeesList[0];
    delete formValue['id'];

    fixture.detectChanges();
    spyOn(component.formSubmit, 'emit');

    component.form.patchValue(parsedEmployeesList[0]);

    component.onSubmit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith(formValue);
  });
});
