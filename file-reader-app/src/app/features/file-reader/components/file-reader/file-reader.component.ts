import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { customValidators } from './../../../../utils';

// Services
import { FileReaderService } from './../../file-reader.service';

/**
 * FileReaderComponent
 * Gives opportunity to upload "csv" files and displays employees table and issue count filter
 */
@Component({
  selector: 'app-file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.scss'],
})
export class FileReaderComponent implements OnInit {
  fileControl: FormControl;
  constructor(
    private fb: FormBuilder,
    private fileReaderService: FileReaderService
  ) {}

  ngOnInit() {
    this.initFileControl();
  }

  /**
   * Inits control for uploading file
   */
  private initFileControl(): void {
    this.fileControl = this.fb.control(null, [
      Validators.required,
      customValidators.requiredFileType('csv'),
    ]);
  }

  /**
   * Handles file changing and calls parse method in the service
   */
  onFileChange(file: File): void {
    if (this.fileControl.valid) {
      this.fileReaderService.parseFile(file);
    }
  }

  /**
   * Handles filter changing and calls filter method in the service
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.fileReaderService.filterEmployeesByIssueCount(filterValue);
  }
}
