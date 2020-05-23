// tslint:disable: no-string-literal
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FileReaderComponent } from './file-reader.component';
import { FileReaderService } from './../../file-reader.service';
import { UploadFileComponent } from './../../../../shared/components';

import { MockFileReaderService } from './../../../../../test-utils';

const file = new File([''], 'file.csv');

describe('FileReaderComponent', () => {
  let component: FileReaderComponent;
  let fileReaderService: FileReaderService;
  let fixture: ComponentFixture<FileReaderComponent>;

  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FileReaderComponent, UploadFileComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: FileReaderService, useValue: new MockFileReaderService() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileReaderComponent);
    component = fixture.componentInstance;
    fileReaderService = fixture.debugElement.injector.get(FileReaderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form control', () => {
    component['initFileControl']();
    expect(component.fileControl).toBeTruthy();
  });

  it('should validate file type', () => {
    const wrongFile = new File([''], 'text.txt');

    component.fileControl.patchValue(file);
    expect(component.fileControl.valid).toBeTrue();

    component.fileControl.patchValue(wrongFile);
    expect(component.fileControl.valid).toBeFalse();
    expect(component.fileControl.errors?.requiredFileType).toBeTrue();
  });

  it('should handle file change and call fileReaderService.parseFile', () => {
    spyOn(fileReaderService, 'parseFile');
    component.fileControl.patchValue(file);

    const nativeElement = fixture.nativeElement;
    const fileInput = nativeElement.querySelector(
      'app-upload-file'
    ) as HTMLInputElement;
    fileInput.dispatchEvent(new Event('fileChange'));

    expect(fileReaderService.parseFile).toHaveBeenCalled();
  });

  it('should filter employees by issue count', () => {
    spyOn(fileReaderService, 'filterEmployeesByIssueCount');

    component.fileControl.patchValue(file);
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement;
    const searchInput = nativeElement.querySelector(
      'input[type="number"]'
    ) as HTMLInputElement;
    searchInput.value = '1';
    searchInput.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();

    expect(fileReaderService.filterEmployeesByIssueCount).toHaveBeenCalledWith(
      '1'
    );
  });
});
