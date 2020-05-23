// tslint:disable: no-string-literal
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { UploadFileComponent } from './upload-file.component';

@Component({
  template: '<app-upload-file [formControl]="file"></app-upload-file>',
})
class TestHostComponent {
  @ViewChild(UploadFileComponent)
  public uploadFileComponent: UploadFileComponent;

  public file: FormControl = new FormControl({ value: null });
}

describe('UploadFileComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let testHostComponent: TestHostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadFileComponent, TestHostComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent.uploadFileComponent).toBeTruthy();
  });

  it('should set btn label', () => {
    const label = 'Test label';
    testHostComponent.uploadFileComponent.btnLabel = label;

    expect(testHostComponent.uploadFileComponent.label).toEqual(label);
  });

  it('should set value', () => {
    const file = new File([''], 'file.csv');
    testHostComponent.file.patchValue(file);

    expect(testHostComponent.file.value).toEqual(file);
    expect(testHostComponent.uploadFileComponent['file']).toEqual(file);
  });

  it('should handle change event and chenge state of form control', () => {
    spyOn(testHostComponent.uploadFileComponent.fileChange, 'emit');
    spyOn<any>(testHostComponent.uploadFileComponent, 'onChange');

    const nativeElement = hostFixture.debugElement.nativeElement;
    const event = document.createEvent('UIEvents');
    event['initUIEvent']('change', true, true);
    const uploadFile = nativeElement.querySelector(
      'app-upload-file'
    ) as HTMLInputElement;

    uploadFile.dispatchEvent(event);

    hostFixture.detectChanges();

    expect(
      testHostComponent.uploadFileComponent.fileChange.emit
    ).toHaveBeenCalled();
    expect(
      testHostComponent.uploadFileComponent['onChange']
    ).toHaveBeenCalled();
  });

  it('should handle click event and chenge state of form control', () => {
    spyOn<any>(testHostComponent.uploadFileComponent, 'onTouch');

    const nativeElement = hostFixture.debugElement.nativeElement;

    const uploadFile = nativeElement.querySelector(
      'app-upload-file'
    ) as HTMLInputElement;

    uploadFile.dispatchEvent(new Event('click'));

    hostFixture.detectChanges();

    expect(testHostComponent.uploadFileComponent['onTouch']).toHaveBeenCalled();
  });
});
